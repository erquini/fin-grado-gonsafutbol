import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';

interface Team {
  id: number;
  name: string;
  crest?: string;
}
interface Competition {
  id: number;
  name: string;
  code: string;
}
interface Match {
  utcDate: string;
  matchday?: number;
  venue?: string;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
}
interface Suggestion {
  id: number;
  name: string;
  type: 'Equipo' | 'Competición';
  code?: string;
}

@Component({
  selector: 'app-calendario-eventos',
  templateUrl: './calendario-eventos.component.html',
  styleUrls: ['./calendario-eventos.component.css'],
  standalone: false
})
export class CalendarioEventosComponent implements OnInit {
  searchTerm: string = '';
  suggestions: Suggestion[] = [];
  matches: Match[] = [];
  errorMessage: string = '';

  private allTeams: Team[] = [];
  private allCompetitions: Competition[] = [];
  private hasLoadedTeams = false;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.loadCompetitions(); // solo competiciones al inicio
  }

  private loadCompetitions(): void {
    this.eventosService.getCompeticiones().subscribe({
      next: (data) => {
        this.allCompetitions = data.competitions.filter((c: any) => c.plan === 'TIER_ONE' && !!c.code);
      },
      error: () => {
        this.errorMessage = '❌ Error al cargar competiciones.';
      }
    });
  }

  private loadAllTeams(): void {
    if (this.hasLoadedTeams) return;

    this.allCompetitions.forEach(comp => {
      this.eventosService.getEquiposPorCompeticion(comp.code).subscribe({
        next: (data) => {
          for (let team of data.teams) {
            if (!this.allTeams.find(t => t.id === team.id)) {
              this.allTeams.push({ id: team.id, name: team.name, crest: team.crest });
            }
          }
        },
        error: () => {
          this.errorMessage = '❌ Error al cargar equipos.';
        }
      });
    });

    this.hasLoadedTeams = true;
  }

  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length < 2) {
      this.suggestions = [];
      return;
    }

    // carga los equipos solo la primera vez que el usuario busca algo
    if (!this.hasLoadedTeams) this.loadAllTeams();

    const teamSuggestions = this.allTeams
      .filter(team => team.name.toLowerCase().includes(term))
      .map(team => ({ id: team.id, name: team.name, type: 'Equipo' as const }));

    const competitionSuggestions = this.allCompetitions
      .filter(comp => comp.name.toLowerCase().includes(term))
      .map(comp => ({ id: comp.id, name: comp.name, type: 'Competición' as const, code: comp.code }));

    this.suggestions = [...competitionSuggestions, ...teamSuggestions].slice(0, 10);
  }

  onSearchSubmit(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return;

    const exactTeam = this.allTeams.find(t => t.name.toLowerCase() === term);
    const exactComp = this.allCompetitions.find(c => c.name.toLowerCase() === term);

    if (exactTeam) {
      this.fetchMatches({ id: exactTeam.id, name: exactTeam.name, type: 'Equipo' });
    } else if (exactComp) {
      this.fetchMatches({ id: exactComp.id, name: exactComp.name, type: 'Competición', code: exactComp.code });
    } else {
      this.errorMessage = 'No se encontró ningún equipo o competición con ese nombre.';
    }
  }

  selectSuggestion(suggestion: Suggestion): void {
    this.searchTerm = suggestion.name;
    this.suggestions = [];
    this.fetchMatches(suggestion);
  }

  private fetchMatches(suggestion: Suggestion): void {
    this.errorMessage = '';
    this.matches = [];

    if (suggestion.type === 'Equipo') {
      this.eventosService.getPartidosPorEquipo(suggestion.id).subscribe({
        next: (data) => this.matches = data.matches,
        error: (error) => {
          this.errorMessage = error.status === 429
            ? '⚠️ Has realizado muchas peticiones. Espera un minuto y vuelve a intentarlo.'
            : '❌ Error al cargar los partidos del equipo.';
        }
      });
    } else if (suggestion.type === 'Competición' && suggestion.code) {
      this.eventosService.getPartidosPorCompeticion(suggestion.code).subscribe({
        next: (data) => this.matches = data.matches,
        error: (error) => {
          this.errorMessage = error.status === 429
            ? '⚠️ Has realizado muchas peticiones. Espera un minuto y vuelve a intentarlo.'
            : '❌ Error al cargar los partidos de la competición.';
        }
      });
    }
  }
  opiniones = [
  {
    texto: 'Es súper útil para ver cuándo juega mi equipo.',
    autor: 'Marta R. de Valencia'
  },
  {
    texto: 'Una herramienta imprescindible cada fin de semana.',
    autor: 'Luis D. de Sevilla'
  },
  {
    texto: 'Gracias a esta sección ya no me pierdo ningún partido.',
    autor: 'Jorge F. de Bilbao'
  }
];

}

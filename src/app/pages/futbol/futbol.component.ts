import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../../services/futbol.service'; // ✅ Ruta correcta

@Component({
  selector: 'app-futbol',
  templateUrl: './futbol.component.html',
  styleUrls: ['./futbol.component.css'],
  standalone: false

})
export class FutbolComponent implements OnInit {
  ligas: any[] = [];
  equipo: any;

  constructor(private futbolService: FutbolService) {}

  ngOnInit() {
    this.futbolService.getLigas().subscribe(
      (datos) => { this.ligas = datos.response; },
      (error) => { console.error('Error al obtener las ligas', error); }
    );

    this.futbolService.getEquipo(541).subscribe(
      (datos) => { this.equipo = datos.response[0]; },
      (error) => { console.error('Error al obtener el equipo', error); }
    );
  }
}


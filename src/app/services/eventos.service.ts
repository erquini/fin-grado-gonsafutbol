import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = '/api/v4'; // usamos el proxy
const TOKEN = 'de044003516d4ef1b3df4ce18c220d97';

const headers = {
  headers: {
    'X-Auth-Token': TOKEN,
    'Accept': 'application/json'
  }
};

@Injectable({ providedIn: 'root' })
export class EventosService {

  constructor(private http: HttpClient) {}

  // Obtener todas las competiciones principales (filtradas en frontend luego)
  getCompeticiones(): Observable<any> {
    return this.http.get(`${API_BASE}/competitions`, headers);
  }

  // Obtener partidos programados por código de competición (ej: PL, CL, PD)
  getPartidosPorCompeticion(codigo: string): Observable<any> {
    return this.http.get(`${API_BASE}/competitions/${codigo}/matches?status=SCHEDULED`, headers);
  }

  // Obtener equipos por competición
  getEquiposPorCompeticion(codigo: string): Observable<any> {
    return this.http.get(`${API_BASE}/competitions/${codigo}/teams`, headers);
  }

  // Obtener partidos por equipo
  getPartidosPorEquipo(idEquipo: number): Observable<any> {
    return this.http.get(`${API_BASE}/teams/${idEquipo}/matches?status=SCHEDULED`, headers);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost/gonsa-futbol-api';

  constructor(private http: HttpClient) {}

registrarUsuario(usuario: { nombre: string, email: string, password: string }) {
  return this.http.post(`${this.apiUrl}/registro.php`, usuario);
}


iniciarSesion(email: string, password: string) {
  return this.http.post(`${this.apiUrl}/login.php`, { email, password });
}


  obtenerUsuarioActual(): Observable<string | null> {
    return this.http.get<{ usuario: string | null }>(`${this.apiUrl}/obtener-usuario.php`).pipe(
      map(res => res.usuario),
      catchError(err => {
        console.error('Error obteniendo usuario:', err);
        return of(null);
      })
    );
  }

  cerrarSesion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cerrar-sesion.php`);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: { nombre: string, email: string, password: string }[] = [];
  private usuarioActual: string | null = null;

  constructor() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }

    this.usuarioActual = localStorage.getItem('usuario');
  }

  registrarUsuario(nombre: string, email: string, password: string): boolean {
    const existe = this.usuarios.find(u => u.email === email);
    if (existe) {
      return false;
    }

    this.usuarios.push({ nombre, email, password });

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    return true;
  }

  iniciarSesion(email: string, password: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      this.usuarioActual = usuario.nombre;

      localStorage.setItem('usuario', usuario.nombre);

      return true;
    }
    return false;
  }

  cerrarSesion() {
    this.usuarioActual = null;
    localStorage.removeItem('usuario'); 
  }

  obtenerUsuarioActual(): string | null {
    return this.usuarioActual;
  }
}

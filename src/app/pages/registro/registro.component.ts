import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: false
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  direccion: string = '';
  telefono: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{9}$/;

    if (!this.nombre || !this.email || !this.password || !this.confirmPassword || !this.direccion || !this.telefono) {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
      return;
    }

    if (!emailRegex.test(this.email)) {
      this.mensajeError = '⚠️ Introduce un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.mensajeError = '⚠️ La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.mensajeError = '⚠️ Las contraseñas no coinciden.';
      return;
    }

    if (!telefonoRegex.test(this.telefono)) {
      this.mensajeError = '⚠️ El número de teléfono debe tener 9 dígitos.';
      return;
    }

    const exito = this.usuarioService.registrarUsuario(this.nombre, this.email, this.password);
    if (exito) {
      this.mensajeExito = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.mensajeError = '⚠️ Este correo ya está registrado.';
    }
  }
}

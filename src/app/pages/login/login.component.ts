import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';  // Servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  email: string = '';           // Campo para el correo electrónico
  password: string = '';        // Campo para la contraseña
  mensajeError: string = '';    // Mensaje de error para mostrar en pantalla

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  // Método para iniciar sesión
  iniciarSesion() {
    if (this.email.trim() && this.password.trim()) {
      const exito = this.usuarioService.iniciarSesion(this.email, this.password);

      if (exito) {
        alert('✅ Inicio de sesión exitoso.');
        this.router.navigate(['/home']);
      } else {
        this.mensajeError = '⚠️ Credenciales incorrectas. Verifica tu correo o contraseña.';
      }
    } else {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
    }
  }
}

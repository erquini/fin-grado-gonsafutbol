import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  iniciarSesion() {
    if (this.email && this.password) {
      const exito = this.usuarioService.iniciarSesion(this.email, this.password);
      if (exito) {
        alert('✅ Inicio de sesión exitoso.');
        this.router.navigate(['/home']);
      } else {
        this.mensajeError = '⚠️ Credenciales incorrectas.';
      }
    } else {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
    }
  }
}

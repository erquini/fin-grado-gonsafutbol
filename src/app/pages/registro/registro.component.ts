import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: false,
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    if (this.nombre && this.email && this.password) {
      const exito = this.usuarioService.registrarUsuario(this.nombre, this.email, this.password);
      if (exito) {
        alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } else {
        this.mensajeError = '⚠️ Este correo ya está registrado.';
      }
    } else {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
    }
  }
}

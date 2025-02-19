import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa el servicio de navegación
import { UsuarioService } from '../../services/usuario.service';  // Importa el servicio para manejar la autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Variable para almacenar el correo electrónico del usuario
  password: string = '';  // Variable para almacenar la contraseña del usuario
  mensajeError: string = '';  // Mensaje de error en caso de que las credenciales sean incorrectas

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Función para iniciar sesión
  iniciarSesion() {
    // Verifica que ambos campos no estén vacíos
    if (this.email && this.password) {
      const exito = this.usuarioService.iniciarSesion(this.email, this.password);  // Llama al servicio de usuario para verificar las credenciales
      if (exito) {
        alert('✅ Inicio de sesión exitoso.');  // Muestra un mensaje de éxito
        this.router.navigate(['/home']);  // Redirige al usuario a la página principal
      } else {
        this.mensajeError = '⚠️ Credenciales incorrectas.';  // Muestra un mensaje de error si las credenciales no son correctas
      }
    } else {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';  // Muestra un mensaje si falta algún campo
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';  // Importamos el servicio para manejar usuarios

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',  // Ruta del template HTML
  standalone: false, 
  styleUrls: ['./registro.component.css']  // Estilos del componente
})
export class RegistroComponent {
  // Variables para almacenar los datos del formulario
  nombre: string = '';
  email: string = '';
  password: string = '';
  mensajeError: string = '';  // Para mostrar mensajes de error

  // Inyección de dependencias: UsuarioService para registrar el usuario y Router para navegar entre páginas
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Método para registrar al usuario
  registrar() {
    // Verificamos si los campos están completos
    if (this.nombre && this.email && this.password) {
      // Intentamos registrar el usuario usando el servicio
      const exito = this.usuarioService.registrarUsuario(this.nombre, this.email, this.password);
      if (exito) {
        // Si el registro es exitoso, mostramos un mensaje y redirigimos al login
        alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } else {
        // Si ya está registrado, mostramos un mensaje de error
        this.mensajeError = '⚠️ Este correo ya está registrado.';
      }
    } else {
      // Si algún campo está vacío, mostramos un mensaje de error
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
    }
  }
}

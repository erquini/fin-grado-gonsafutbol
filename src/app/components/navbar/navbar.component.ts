import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

/**
 * @component NavbarComponent
 * @description Gestiona la barra de navegación de la aplicación, mostrando enlaces y controles de sesión.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /** Usuario actualmente logueado */
  usuarioLogueado: string | null = null;

  /**
   * @constructor
   * @param usuarioService Servicio de usuario para obtener información de sesión.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  /** 
   * Método de inicialización del componente.
   * @method ngOnInit
   * @description Obtiene el usuario actual al cargar el componente.
   */
  ngOnInit() {
    this.usuarioLogueado = this.usuarioService.obtenerUsuarioActual();
  }

  /**
   * @method cerrarSesion
   * @description Cierra la sesión del usuario y redirige a la página principal.
   */
  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.usuarioLogueado = null;
    this.router.navigate(['/home']);
  }
}

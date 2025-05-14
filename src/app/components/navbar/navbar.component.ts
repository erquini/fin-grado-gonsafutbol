import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

/**
 * @component NavbarComponent
 * @description Gestiona la barra de navegación de la aplicación, mostrando enlaces y controles de sesión.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:false
})
export class NavbarComponent implements OnInit {
  /** Usuario actualmente logueado */
  usuarioLogueado: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

ngOnInit(): void {
  this.usuarioService.obtenerUsuarioActual().subscribe(usuario => {
    this.usuarioLogueado = usuario;
  });
}


  /**
   * @method cerrarSesion
   * @description Cierra la sesión del usuario y redirige a la página principal.
   */
  cerrarSesion() {
    this.usuarioService.cerrarSesion().subscribe(() => {
      this.usuarioLogueado = null;
      this.router.navigate(['/home']);
    });
  }
}

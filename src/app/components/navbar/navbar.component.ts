import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  usuarioLogueado: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuarioLogueado = this.usuarioService.obtenerUsuarioActual();
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.usuarioLogueado = null;
    this.router.navigate(['/home']);
  }
}

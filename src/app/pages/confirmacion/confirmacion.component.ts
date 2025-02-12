import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  standalone: false,
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  nombre: string = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as { nombre: string };
    this.nombre = state ? state.nombre : "Cliente";
  }

  volverAlInicio() {
    this.router.navigate(['/home']); 
  }
}

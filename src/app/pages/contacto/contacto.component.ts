import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  standalone: false,
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';
  errorMensaje: string = '';

  constructor(private router: Router) {}

  enviarMensaje() {
    if (!this.nombre || !this.email || !this.telefono || !this.mensaje) {
      this.errorMensaje = '⚠️ Todos los campos son obligatorios.';
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.errorMensaje = '⚠️ Ingresa un email válido.';
      return;
    }

    if (!this.validarTelefono(this.telefono)) {
      this.errorMensaje = '⚠️ Ingresa un número de teléfono válido (solo números, mínimo 9 dígitos).';
      return;
    }

    this.router.navigate(['/contacto-confirmacion']);
  }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }

  validarTelefono(telefono: string): boolean {
    const re = /^[0-9]{9,15}$/; 
    return re.test(telefono);
  }
}

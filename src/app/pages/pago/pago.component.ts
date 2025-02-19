import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  standalone: false,
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  nombre: string = '';  // Almacena el nombre del usuario
  direccion: string = '';  // Almacena la dirección de envío
  tarjeta: string = '';  // Almacena el número de tarjeta
  carritoTotal: number = 0;  // Almacena el total del carrito
  errores: string[] = [];  // Lista de errores de validación

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    // Calcula el total del carrito sumando los precios de los productos
    this.carritoTotal = this.carritoService.getCarrito().reduce((total, producto) => total + producto.precio, 0);
  }

  procesarPago() {
    // Limpiamos la lista de errores antes de procesar el pago
    this.errores = [];

    // Validación del nombre
    if (this.nombre.trim().length < 3) {
      this.errores.push("⚠️ El nombre debe tener al menos 3 caracteres.");
    }

    // Validación de la dirección
    if (this.direccion.trim().length < 5) {
      this.errores.push("⚠️ La dirección debe ser válida.");
    }

    // Validación del número de tarjeta (16 dígitos numéricos)
    if (!/^\d{16}$/.test(this.tarjeta)) {
      this.errores.push("⚠️ La tarjeta debe tener 16 dígitos numéricos.");
    }

    // Si no hay errores, se procesa el pago
    if (this.errores.length === 0) {
      this.carritoService.vaciarCarrito();  // Vaciar el carrito después del pago
      this.router.navigate(['/confirmacion'], { state: { nombre: this.nombre } });  // Navegar a la página de confirmación
    }
  }
}

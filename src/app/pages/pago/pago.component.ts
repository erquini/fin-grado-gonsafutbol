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
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  codigoPostal: string = '';
  tarjeta: string = '';
  carritoTotal: number = 0;
  errores: string[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carritoTotal = this.carritoService.getCarrito().reduce((total, producto) => total + producto.precio, 0);
  }

  procesarPago() {
    this.errores = [];

    if (this.nombre.trim().length < 3) {
      this.errores.push("⚠️ El nombre debe tener al menos 3 caracteres.");
    }

    if (!/^\d{9}$/.test(this.telefono)) {
      this.errores.push("⚠️ El teléfono debe tener 9 dígitos numéricos.");
    }

    if (this.direccion.trim().length < 5) {
      this.errores.push("⚠️ La dirección debe ser válida.");
    }

    if (!/^\d{5}$/.test(this.codigoPostal)) {
      this.errores.push("⚠️ El código postal debe tener 5 dígitos.");
    }

    if (!/^\d{16}$/.test(this.tarjeta)) {
      this.errores.push("⚠️ La tarjeta debe tener 16 dígitos numéricos.");
    }

    if (this.errores.length === 0) {
      this.carritoService.vaciarCarrito();
      alert(`✅ Pago realizado con éxito. Gracias por tu compra, ${this.nombre}.`);
      this.router.navigate(['/confirmacion'], { state: { nombre: this.nombre } });
    }
  }
}

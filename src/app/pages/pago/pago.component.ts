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
  direccion: string = '';
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

    if (this.direccion.trim().length < 5) {
      this.errores.push("⚠️ La dirección debe ser válida.");
    }

    if (!/^\d{16}$/.test(this.tarjeta)) {
      this.errores.push("⚠️ La tarjeta debe tener 16 dígitos numéricos.");
    }

    if (this.errores.length === 0) {
      this.carritoService.vaciarCarrito();
      this.router.navigate(['/confirmacion'], { state: { nombre: this.nombre } });
    }
  }
}

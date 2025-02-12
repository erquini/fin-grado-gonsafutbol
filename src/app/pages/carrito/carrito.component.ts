import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  standalone: false,
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.carrito.reduce((sum, producto) => sum + producto.precio, 0);
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
    this.total = 0;
  }

  procederAlPago() {
    if (this.carrito.length === 0) {
      alert('⚠️ Tu carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }
    this.router.navigate(['/pago']);
  }

  seguirComprando() {
    this.router.navigate(['/tienda']);
  }
}

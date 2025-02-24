/**
 * @component CarritoComponent
 * @description Maneja el carrito de compras, permitiendo eliminar productos, vaciarlo y proceder al pago.
 */
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
  /** Lista de productos en el carrito */
  carrito: Producto[] = [];
  /** Total a pagar */
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  /** Obtiene los productos del carrito y calcula el total */
  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  /** Calcula el total del carrito */
  calcularTotal() {
    this.total = this.carrito.reduce((sum, producto) => sum + producto.precio, 0);
  }

  /** Elimina un producto del carrito */
  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  /** Vacía completamente el carrito */
  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
    this.total = 0;
  }

  /** Redirige a la página de pago si hay productos en el carrito */
  procederAlPago() {
    if (this.carrito.length === 0) {
      alert('⚠️ Tu carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }
    this.router.navigate(['/pago']);
  }

  /** Redirige a la tienda para seguir comprando */
  seguirComprando() {
    this.router.navigate(['/tienda']);
  }
}

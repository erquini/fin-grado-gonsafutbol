import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';

interface Recomendacion {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

interface Testimonio {
  nombre: string;
  mensaje: string;
  fecha: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: false
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;

  productosRecomendados = [
    {
      nombre: 'Camiseta Edición Limitada',
      precio: 39.99,
      imagen: 'assets/images/recomendacion1.jpg'
    },
    {
      nombre: 'Camiseta Retro 90s',
      precio: 29.99,
      imagen: 'assets/images/recomendacion2.jpg'
    },
    {
      nombre: 'Pack 3 Camisetas Personalizadas',
      precio: 59.99,
      imagen: 'assets/images/recomendacion3.jpg'
    }
  ];
  

  testimonios: Testimonio[] = [
    {
      nombre: 'Carlos M.',
      mensaje: 'La calidad de la camiseta es excelente y llegó en solo 2 días.',
      fecha: '10 de abril de 2025'
    },
    {
      nombre: 'Lucía G.',
      mensaje: 'Me encantó poder personalizar todo, ¡hasta el parche!',
      fecha: '3 de abril de 2025'
    },
    {
      nombre: 'Pedro R.',
      mensaje: 'Buen servicio y muy atentos en el soporte postventa.',
      fecha: '28 de marzo de 2025'
    }
  ];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
    this.total = 0;
  }

  procederAlPago(): void {
    if (this.carrito.length === 0) {
      alert('⚠️ Tu carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }
    this.router.navigate(['/pago']);
  }

  seguirComprando(): void {
    this.router.navigate(['/tienda']);
  }
}

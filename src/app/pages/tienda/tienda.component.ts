import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  standalone: false
})
export class TiendaComponent {
  // Productos
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  // Filtros
  filtroEquipo: string = '';
  filtroTemporada: string = '';
  filtroPrecio: number = 200;

  // Orden actual
  orden: string = 'precioAsc';

  // Opiniones para mostrar (para HTML extendido)
  opiniones = [
    { texto: 'La calidad es espectacular. Volveré a comprar.', autor: 'Carlos García' },
    { texto: 'Excelente servicio y envío rápido.', autor: 'Lucía Fernández' },
    { texto: 'La personalización quedó increíble. ¡Gracias!', autor: 'Pedro Ramírez' }
  ];

  // Galería
  imagenesGaleria = [
    'assets/images/galeria1.jpg',
    'assets/images/galeria2.jpg',
    'assets/images/galeria3.jpg',
    'assets/images/galeria4.jpg',
    'assets/images/galeria5.jpg',
    'assets/images/galeria6.jpg',
    'assets/images/galeria7.jpg',
    'assets/images/galeria8.jpg'
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    // Obtener productos del servicio
    this.productos = this.productoService.getProductos();

    // Aplicar filtros por defecto (todos)
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    // Filtros combinados
    this.productosFiltrados = this.productos.filter(producto =>
      producto.equipo.toLowerCase().includes(this.filtroEquipo.toLowerCase()) &&
      producto.temporada.toLowerCase().includes(this.filtroTemporada.toLowerCase()) &&
      producto.precio <= this.filtroPrecio
    );

    // Ordenar después de filtrar
    this.ordenarProductos();
  }

  resetFiltros(): void {
    this.filtroEquipo = '';
    this.filtroTemporada = '';
    this.filtroPrecio = 200;
    this.aplicarFiltros();
  }

  ordenarProductos(): void {
    switch (this.orden) {
      case 'precioAsc':
        this.productosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        this.productosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }
  }
}

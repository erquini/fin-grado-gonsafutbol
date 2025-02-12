import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  standalone: false,
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  filtroEquipo: string = '';
  filtroTemporada: string = '';
  filtroPrecio: number = 100; 

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos = this.productoService.getProductos();
    this.productosFiltrados = this.productos;
  }

  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.equipo.toLowerCase().includes(this.filtroEquipo.toLowerCase()) &&
      producto.temporada.includes(this.filtroTemporada) &&
      producto.precio <= this.filtroPrecio
    );
  }
}

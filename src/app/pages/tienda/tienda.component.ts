import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';  // Servicio para obtener productos
import { Producto } from '../../interfaces/producto';  // Interfaz para tipar los productos

@Component({
  selector: 'app-tienda',  // Selector para usar el componente en la vista
  templateUrl: './tienda.component.html',  // Ruta del archivo HTML para el componente
  standalone: false,  // Indica que el componente no es independiente (se utiliza en otro módulo)
  styleUrls: ['./tienda.component.css']  // Ruta del archivo CSS para el componente
})
export class TiendaComponent {
  productos: Producto[] = [];  // Array para almacenar todos los productos
  productosFiltrados: Producto[] = [];  // Array para almacenar los productos filtrados

  filtroEquipo: string = '';  // Filtro de equipo
  filtroTemporada: string = '';  // Filtro de temporada
  filtroPrecio: number = 100;  // Filtro de precio máximo (valor inicial de 100)

  constructor(private productoService: ProductoService) {}  // Inyección del servicio ProductoService

  ngOnInit() {
    // Carga los productos iniciales al componente
    this.productos = this.productoService.getProductos();  // Obtiene todos los productos desde el servicio
    this.productosFiltrados = this.productos;  // Inicializa los productos filtrados con todos los productos
  }

  aplicarFiltros() {
    // Aplica los filtros según los valores seleccionados por el usuario
    this.productosFiltrados = this.productos.filter(producto =>
      producto.equipo.toLowerCase().includes(this.filtroEquipo.toLowerCase()) &&  // Filtra por equipo
      producto.temporada.includes(this.filtroTemporada) &&  // Filtra por temporada
      producto.precio <= this.filtroPrecio  // Filtra por precio
    );
  }
}

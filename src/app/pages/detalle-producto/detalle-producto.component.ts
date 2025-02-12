import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';  // ✅ Importamos el servicio del carrito

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: false,
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto: Producto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService  
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producto = this.productoService.getProductoById(id);
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      alert(`✅ ${this.producto.nombre} añadida al carrito.`);
    }
  }

  volver() {
    this.router.navigate(['/tienda']);
  }
}

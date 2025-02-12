import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productosPopulares: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productosPopulares = this.productoService.getProductos().slice(0, 3);
  }
}

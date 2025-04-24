import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  categorias = [
    { nombre: 'Selecciones', imagen: 'assets/images/selecciones.png' },
    { nombre: 'Clubes', imagen: 'assets/images/clubes.png' },
    { nombre: 'Históricas', imagen: 'assets/images/historicas.png' },
    { nombre: 'Personalizadas', imagen: 'assets/images/personalizadas.png' }
  ];

  productosPopulares = [
    {
      id: 1,
      nombre: 'Camiseta Brasil 2002',
      equipo: 'Brasil',
      temporada: '2002',
      imagen: 'assets/images/camiseta-ronaldo.jpg',
      precio: 65.99
    },
    {
      id: 2,
      nombre: 'Camiseta Maradona 1986',
      equipo: 'Argentina',
      temporada: '1986',
      imagen: 'assets/images/camiseta_maradadona_futbol.jpg',
      precio: 74.99
    },
    {
      id: 3,
      nombre: 'Camiseta Francia 1998',
      equipo: 'Francia',
      temporada: '1998',
      imagen: 'assets/images/zidane.jpg',
      precio: 79.99
    }
  ];

  opiniones = [
    { texto: '¡La camiseta llegó perfecta y muy rápido!', autor: 'Carlos García' },
    { texto: 'Excelente calidad y diseño. Muy recomendada.', autor: 'Lucía Fernández' },
    { texto: 'Me encantó la opción de personalizar. ¡10/10!', autor: 'Pedro Ramírez' }
  ];

  imagenesGaleria = [
    'assets/images/galeria1.jpg',
    'assets/images/galeria2.jpg',
    'assets/images/galeria3.jpg',
    'assets/images/galeria4.jpg'
  ];
}

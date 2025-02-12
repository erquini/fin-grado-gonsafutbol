import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Camiseta de Maldini 2006/2007',
      equipo: 'AC Milan',
      temporada: '2006/07',
      imagen: 'assets/images/camiesta-maldini.jpg', 
      precio: 59.99,
      descripcion: 'Camiseta icónica de Maldini en la temporada 2006/07.'
    },
    {
      id: 2,
      nombre: 'Camiseta de Maradona 1986',
      equipo: 'Argentina',
      temporada: '1986',
      imagen: 'assets/images/camiseta_maradadona_futbol.jpg',
      precio: 69.99,
      descripcion: 'Camiseta legendaria de Maradona en el Mundial de 1986.'
    },
    {
      id: 3,
      nombre: 'Camiseta de Ronaldo 2002',
      equipo: 'Brasil',
      temporada: '2002',
      imagen: 'assets/images/camiseta-ronaldo.jpg',
      precio: 65.99,
      descripcion: 'Camiseta con la que Ronaldo llevó a Brasil a la victoria en 2002.'
    },
    {
      id: 4,
      nombre: 'Camiseta de Messi 2010',
      equipo: 'Argentina',
      temporada: '2010',
      imagen: 'assets/images/barcelona.jpg',
      precio: 74.99,
      descripcion: 'Camiseta de Messi en el Mundial de Sudáfrica 2010.'
    },
    {
      id: 5,
      nombre: 'Camiseta de Zidane 1998',
      equipo: 'Francia',
      temporada: '1998',
      imagen: 'assets/images/zidane.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Zidane en la Copa del Mundo 1998.'
    },
    {
      id: 6,
      nombre: 'Camiseta de Ronaldinho 2005',
      equipo: 'FC Barcelona',
      temporada: '2005/06',
      imagen: 'assets/images/barcelona.jpg',
      precio: 69.99,
      descripcion: 'Camiseta con la que Ronaldinho ganó el Balón de Oro en 2005.'
    },
    // Añadimos más camisetas
    {
      id: 7,
      nombre: 'Camiseta de Cristiano Ronaldo 2008',
      equipo: 'Manchester United',
      temporada: '2008',
      imagen: 'assets/images/camiseta-ronaldi.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Cristiano Ronaldo en su época dorada con el Manchester United.'
    },
    {
      id: 8,
      nombre: 'Camiseta de Neymar 2013',
      equipo: 'FC Barcelona',
      temporada: '2013/14',
      imagen: 'assets/images/ney.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Neymar en su primera temporada con el FC Barcelona.'
    },
    {
      id: 9,
      nombre: 'Camiseta de Pelé 1970',
      equipo: 'Brasil',
      temporada: '1970',
      imagen: 'assets/images/pele.jpg',
      precio: 120.00,
      descripcion: 'La famosa camiseta de Pelé en el Mundial de 1970, una de las más legendarias.'
    },
    {
      id: 10,
      nombre: 'Camiseta de Beckham 2003',
      equipo: 'Manchester United',
      temporada: '2003',
      imagen: 'assets/images/beckam.jpg',
      precio: 85.99,
      descripcion: 'Camiseta de David Beckham durante su tiempo en el Manchester United.'
    },
    {
      id: 11,
      nombre: 'Camiseta de Thierry Henry 2004',
      equipo: 'Arsenal',
      temporada: '2004',
      imagen: 'assets/images/henry.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Thierry Henry en su histórica temporada con el Arsenal.'
    },
    {
      id: 12,
      nombre: 'Camiseta de Van Basten 1988',
      equipo: 'Holanda',
      temporada: '1988',
      imagen: 'assets/images/van-basten.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Marco Van Basten en la Eurocopa 1988.'
    },
    {
      id: 13,
      nombre: 'Camiseta de Messi 2014',
      equipo: 'Argentina',
      temporada: '2014',
      imagen: 'assets/images/messi-2014.jpg',
      precio: 74.99,
      descripcion: 'Camiseta de Messi durante el Mundial de Brasil 2014.'
    },
    {
      id: 14,
      nombre: 'Camiseta de Ronaldo 2016',
      equipo: 'Portugal',
      temporada: '2016',
      imagen: 'assets/images/cris.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Cristiano Ronaldo en su triunfo con Portugal en la Euro 2016.'
    }
  ];

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }
}

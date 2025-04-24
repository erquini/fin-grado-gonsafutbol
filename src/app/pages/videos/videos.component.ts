import { Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  standalone: false,
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  leyendas = [
    {
      nombre: 'Pelé',
      imagen: 'assets/images/pele.jpg',
      video: 'https://www.youtube.com/embed/uHgDlcGfQ-U'
    },
    {
      nombre: 'Maradona',
      imagen: 'assets/images/maradona.jpg',
      video: 'https://www.youtube.com/embed/V_JjV_mH6pM'
    },
    {
      nombre: 'Zidane',
      imagen: 'assets/images/zidane.jpg',
      video: 'https://www.youtube.com/embed/4nGrL1TZy9M'
    }
  ];

  verVideo(url: string) {
    window.open(url, '_blank');
  }
}

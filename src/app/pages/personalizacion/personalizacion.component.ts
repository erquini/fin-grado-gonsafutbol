import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-personalizacion',
  templateUrl: './personalizacion.component.html',
  styleUrls: ['./personalizacion.component.css'],
  standalone: false
})
export class PersonalizacionComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  nombre: string = '';
  numero: string = '';
  color: string = 'blanca';
  parche: string = '';
  ctx!: CanvasRenderingContext2D;

  baseImage = new Image();
  parcheImage = new Image();

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.dibujarCamiseta();
  }

  dibujarCamiseta() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.baseImage.src = 'assets/images/base-camiseta.png';
    this.baseImage.onload = () => {
      ctx.drawImage(this.baseImage, 0, 0, canvas.width, canvas.height);

      // Color de fondo (simulado con overlay)
      ctx.fillStyle = this.obtenerColorHex(this.color);
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Nombre
      ctx.font = '20px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(this.nombre, canvas.width / 2, 150);

      // Número
      ctx.font = 'bold 40px Arial';
      ctx.fillText(this.numero, canvas.width / 2, 200);

      // Parche
      if (this.parche) {
        const parche = new Image();
        parche.src = `assets/images/${this.parche}.png`;
        parche.onload = () => {
          ctx.drawImage(parche, 75, 120, 40, 40); 
        };
      }   
    };
  }

  actualizarVista(): void {
    this.dibujarCamiseta();
  }

  agregarAlCarrito(): void {
    alert(`🛒 Camiseta personalizada añadida al carrito: ${this.nombre} #${this.numero}`);  }

  obtenerColorHex(color: string): string {
    switch (color) {
      case 'roja': return '#dc3545';
      case 'azul': return '#007bff';
      case 'verde': return '#28a745';
      case 'blanca': return '#ffffff';
      default: return '#f8f9fa';
    }
  }
}

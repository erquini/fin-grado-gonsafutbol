import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GelatoService } from '../../services/gelato.service'; // este es el servicio que luego creamos

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
  mensaje: string = '';

  ctx!: CanvasRenderingContext2D;
  baseImage = new Image();

  constructor(private gelatoService: GelatoService) {}

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

      ctx.fillStyle = this.obtenerColorHex(this.color);
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      ctx.font = '20px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(this.nombre, canvas.width / 2, 150);

      ctx.font = 'bold 40px Arial';
      ctx.fillText(this.numero, canvas.width / 2, 200);

      if (this.parche) {
        const parche = new Image();
        parche.src = `assets/images/${this.parche}.png`;
        parche.onload = () => ctx.drawImage(parche, 75, 120, 40, 40);
      }
    };
  }

  actualizarVista(): void {
    this.dibujarCamiseta();
  }

  async agregarAlCarrito(): Promise<void> {
    const data = {
      order_type: 'draft',
      template_id: 'e5b91629-8bd6-47c7-ae84-b288b967a63c', // <- Sustituye con el ID real de Gelato
      template_fields: {
        nombre: this.nombre,
        numero: this.numero
      },
      shipping_address: {
        first_name: 'Usuario',
        last_name: 'Ejemplo',
        email: 'usuario@ejemplo.com',
        address_line1: 'Calle Falsa 123',
        city: 'Madrid',
        postal_code: '28000',
        country: 'ES'
      }
    };

    try {
      const result = await this.gelatoService.crearOrdenPersonalizada(data);
      this.mensaje = `✅ Camiseta enviada a Gelato (orden ID: ${result.id})`;
    } catch (err) {
      console.error(err);
      this.mensaje = '❌ Error al crear la orden en Gelato';
    }
  }

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

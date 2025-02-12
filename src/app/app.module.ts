import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ✅ Importamos el componente principal
import { AppComponent } from './app.component';

// ✅ Importamos las páginas con standalone: false
import { HomeComponent } from './pages/home/home.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PagoComponent } from './pages/pago/pago.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { FutbolComponent } from './pages/futbol/futbol.component'; // ✅ Importar aquí

// ✅ Importamos los componentes de navbar y footer
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// ✅ Importamos los servicios
import { FutbolService } from './services/futbol.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TiendaComponent,
    DetalleProductoComponent,
    CarritoComponent,
    ContactoComponent,
    PagoComponent,
    RegistroComponent,
    LoginComponent,
    FutbolComponent // ✅ Agregar correctamente aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule, // ✅ Importante para llamadas HTTP
  ],
  providers: [FutbolService], // ✅ Agregamos el servicio aquí
  bootstrap: [AppComponent]
})
export class AppModule { }

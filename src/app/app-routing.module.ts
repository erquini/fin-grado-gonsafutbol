import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoConfirmacionComponent } from './pages/contacto-confirmacion/contacto-confirmacion.component';
import { FutbolComponent } from './pages/futbol/futbol.component';

const routes: Routes = [
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'producto/:id', component: DetalleProductoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto-confirmacion', component: ContactoConfirmacionComponent },
  { path: 'futbol', component: FutbolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

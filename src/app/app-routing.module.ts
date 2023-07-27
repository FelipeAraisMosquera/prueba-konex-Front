import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'venta', component: VentasComponent},
  {path: 'medicamentos', component: MedicamentosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
)],
exports: [RouterModule]
})
export class AppRoutingModule { }

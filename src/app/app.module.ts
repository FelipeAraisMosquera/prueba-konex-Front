import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentasComponent } from './ventas/ventas.component';
import { HeaderComponent } from './header/header.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditVentaComponent } from './edit-venta/edit-venta.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { EditMedicamentoComponent } from './edit-medicamento/edit-medicamento.component';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';








@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    HeaderComponent,
    MedicamentosComponent,
    EditVentaComponent,
    EditMedicamentoComponent,
    CrearMedicamentoComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  title = 'Listado de ventas';
  fechaI: string = '';
  fechaF: string = '';
  cantidad: number = 0;
  medicamentoId: number = 0;


  consultarVenta(){
   axios.get('http://localhost:8080/venta/filtrar', { params: { fechaI: this.fechaI, fechaF: this.fechaF }} )
    .then((Response: AxiosResponse)=> {//nos devuelve una promesa, cuando la ejecucion termina
      const tablaBody = document.getElementById('tabla-body') as HTMLTableSectionElement;  
      const data = Response.data;
        console.log(Response.data)
       

        data.forEach((venta: any)=>{
          const newRow = tablaBody.insertRow();
          newRow.innerHTML = `
          <td>${venta.id}</td>
          <td>${venta.cantidad}</td>
          <td>${venta.fechaHora}</td>
          <td>${venta['valorTotal']}</td>
          <td>${venta['valorUnitario']}</td>
          <td>${venta.medicamentos.id}</td>
        `;
        });
        
      
    })
    .catch((error: any) => {
        console.log('No Funciona, hay algun error', error)
    })
  }

  agregarVenta(){
    // Asignar los valores de los campos del formulario a las variables

  
    axios.post('http://localhost:8080/venta', [
      {
        cantidad: this.cantidad,
        medicamentoId: this.medicamentoId
      }
    ])
      .then((Response: AxiosResponse)=> {
        console.log(Response.data);
      })
      .catch((error: any) => {
        console.log('No Funciona, hay algun error', error);
      });
  }
  

  limpiarTabla(){
    const tablaBody = document.getElementById('tabla-body') as HTMLTableSectionElement;
    tablaBody.innerHTML = '';
  }

  limpiarYconsultarVenta(): void {
    this.limpiarTabla();
    this.consultarVenta();
  }
}

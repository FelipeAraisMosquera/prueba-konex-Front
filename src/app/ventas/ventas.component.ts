import { Component, OnInit  } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditVentaComponent } from '../edit-venta/edit-venta.component';




@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  
})

export class VentasComponent implements OnInit {
  ventas!: Array<any>;
  title = 'Listado de ventas';
  fechaI: string = '';
  fechaF: string = '';
  cantidad: number | null = null;
  medicamentoId: number | null = null;
  valorUnitario: number = 0;
  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.consultarVenta() // Llama a la función para consultar las ventas al iniciar el componente.
    
  }
  



  deleteEmployee(element: any) {
    Swal.fire({
      icon: 'question',
      title: '¿Desea eliminar con seguridad?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#488D95',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/venta/${element.id}`)
          .then(() => {
            this.ventas = this.ventas.filter((venta) => venta.id !== element.id);
            Swal.fire('La venta se ha eliminado exitosamente');
            this.consultarVenta();
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Error al eliminar la venta', error);
          });
      } else if (result.isDismissed) {
        Swal.fire('El registro no se ha eliminado', '', 'info');
      }
    });
  }

  consultarVenta(){
   axios.get('http://localhost:8080/venta/filtrar', { params: { fechaI: this.fechaI, fechaF: this.fechaF }} )
   .then((response: any) => {
    this.ventas = response.data; 
    this.dataSource.data = this.ventas; 
    console.log(this.ventas);
  })
  .catch((error: any) => {
    console.log('No funciona', error);
  });
  }
  
  


  agregarVenta(){
      axios.post('http://localhost:8080/venta', [
      {
        cantidad: this.cantidad,
        medicamentoId: this.medicamentoId
      }
    ])
      .then((Response: AxiosResponse)=> {
        console.log(Response.data);
        this.consultarVenta();
      })
      .catch((error: any) => {
        console.log('No Funciona, hay algun error', error);
      });
  }

 
  actualizarVenta(){
    axios.put('http://localhost:8080/venta', [
    {
      cantidad: this.cantidad,
      valorUnitario: this.valorUnitario
    }
  ])
    .then((Response: AxiosResponse)=> {
      console.log(Response.data);
      this.consultarVenta();
    })
    .catch((error: any) => {
      console.log('No Funciona, hay algun error', error);
    });
}
  
openDialog(element: any): void {

  const config = {
    data: {
      message: element ? 'Editar Venta' : 'Error',
      content: element
    }
  };
  const dialogRef = this.dialog.open(EditVentaComponent, config);
  dialogRef.afterClosed().subscribe(result => {
    this.consultarVenta();
  });
}
       

  limpiarTabla(){
    const tablaBody = document.getElementById('tabla-body') as HTMLTableSectionElement;
    tablaBody.innerHTML = '';
  }

  
}

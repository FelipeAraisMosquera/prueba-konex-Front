import { Component, OnInit  } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditMedicamentoComponent } from '../edit-medicamento/edit-medicamento.component';
import { CrearMedicamentoComponent } from '../crear-medicamento/crear-medicamento.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent {




  medicamentos!: Array<any>;
  title = 'Listado de medicamentos';
  id: number | null = null;
  nombre: string = '';
  laboratorio: string = '';
  fechaFabricación: Date | null = null;
  fechaVencimiento: Date | null = null;
  cantidadStock: number | null = null;
  valorUnitario: number | null = null;
  dataSource = new MatTableDataSource();

    


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.consultarMedicamento() // Llama a la función para consultar las medicamentos al iniciar el componente.
    
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
        axios.delete(`http://localhost:8080/medicamentos/${element.id}`)
          .then(() => {
            this.medicamentos = this.medicamentos.filter((medicamento) => medicamento.id !== element.id);
            Swal.fire('el medicamento se ha eliminado exitosamente');
            this.consultarMedicamento();
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Error al eliminar el medicamento', error);
          });
      } else if (result.isDismissed) {
        Swal.fire('El registro no se ha eliminado');
      }
    });
  }

  consultarMedicamento(){
   axios.get('http://localhost:8080/medicamentos')
   .then((response: any) => {
    this.medicamentos = response.data; // Asigna los datos de la API a la variable medicamentos.
    this.dataSource.data = this.medicamentos; // Actualiza los datos del dataSource para la tabla.
    console.log(this.medicamentos);
  })
  .catch((error: any) => {
    console.log('No funciona', error);
  });
  }

  buscarMedicamento() {
  axios.get(`http://localhost:8080/medicamentos/${this.id}`)
    .then((response: any) => {
      if(response.data){
        this.medicamentos = [response.data]; 
        this.dataSource.data = this.medicamentos; 
        console.log(this.medicamentos);
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Medicamento no encontrado',
          text: 'El medicamento con el ID proporcionado no se encontró en la tabla.',
          confirmButtonColor: '#045b62'
        });
      }
      
    })
    .catch((error: any) => {
      console.log('No funciona', error);
    });
}
  
  

openDialogCreate() {
console.log("entro");
  const config = {
    
    data: {
      
      message:  'agregar Medicamento',
      error: 'Error'
      
    }
  };
  const dialogRef = this.dialog.open(CrearMedicamentoComponent, config);
  dialogRef.afterClosed().subscribe(result => {
    this.consultarMedicamento();
  });
}

 

  
openDialog(element: any): void {

  const config = {
    data: {
      message: element ? 'Editar Medicamento' : 'Error',
      content: element
    }
  };
  const dialogRef = this.dialog.open(EditMedicamentoComponent, config);
  dialogRef.afterClosed().subscribe(result => {
    this.consultarMedicamento();
  });
}
       

  limpiarTabla(){
    const tablaBody = document.getElementById('tabla-body') as HTMLTableSectionElement;
    tablaBody.innerHTML = '';
  }

  consultarYBuscarMedicamentos() {
    console.log(this.id)
  
    if (this.id !=null) {
      this.buscarMedicamento();
    } else {
      // Si el input está vacío, ejecuta la función consultarMedicamento()
      this.consultarMedicamento();
    }
  }
  
  



}

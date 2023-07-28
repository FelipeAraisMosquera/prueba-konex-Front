import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrls: ['./crear-medicamento.component.css']
})
export class CrearMedicamentoComponent {

  

  constructor( private fb: FormBuilder, public dialog: MatDialogRef<CrearMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {  }

  spinner: boolean = false;
  element = this.data.content;
  form!: FormGroup;
  cities!: Array<any>;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      laboratorio: ['', Validators.required],
      fechaFabricacion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      cantidadStock: ['', Validators.required],
      valorUnitario: ['', Validators.required],
    });
    this.initValuesForm();
  }

  private initValuesForm(): void {    
    this.form.patchValue({
      nombre: this.element.nombre,
      laboratorio: this.element.laboratorio,
      fechaFabricacion: this.element.fechaFabricacion,
      fechaVencimiento: this.element.fechaVencimiento,
      cantidadStock: this.element.cantidadStock,
      valorUnitario: this.element.valorUnitario
    });
  }

  cancelModify() {
    this.dialog.close(true);
  }

  onSubmit() {
    Swal.fire({
      icon: 'question',
      title: '¿Desea guardar los cambios?',
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      showConfirmButton: true,
      confirmButtonText: `Guardar`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      if (result.isConfirmed) {
      
        if (this.form.valid) {
          this.spinner = true;
          
          axios.post(`http://localhost:8080/medicamentos`, {
            nombre: this.form.value.nombre,
            laboratorio: this.form.value.laboratorio,
            fechaFabricacion: this.form.value.fechaFabricacion,
            fechaVencimiento: this.form.value.fechaVencimiento,
            cantidadStock: this.form.value.cantidadStock,
            valorUnitario: this.form.value.valorUnitario

          }).then(() => {
            this.dialog.close(true);
            Swal.fire('El medicamento se ha creado con exito');
            this.spinner = false;
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Problema al Crear', error);
          });
         
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Datos invalidos',
            text: 'Por favor diligencie los datos correctamente',
            background: '#fff',
            confirmButtonColor: '#045b62'
          });
          console.log("Form error");
        }
      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info')
      }
    })
  }

}

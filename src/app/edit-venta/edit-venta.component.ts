
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-venta',
  templateUrl: './edit-venta.component.html',
  styleUrls: ['./edit-venta.component.css']
})
export class EditVentaComponent {


  constructor( private fb: FormBuilder, public dialog: MatDialogRef<EditVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {  }

  spinner: boolean = false;
  element = this.data.content;
  form!: FormGroup;
  cities!: Array<any>;

  ngOnInit(): void {
    this.form = this.fb.group({
      cantidad: ['', [Validators.required]],
      valorUnitario: ['', Validators.required],
    });
    this.initValuesForm();
  }

  private initValuesForm(): void {    
    this.form.patchValue({
      cantidad: this.element.cantidad,
      valorUnitario: this.element.valorUnitario,
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
        //si la validacion del formulario es exitosa...
        if (this.form.valid) {
          this.spinner = true;
          //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
          //se recogen usando los controles "email" y "password" para formar el json a enviar..
          axios.put(`http://localhost:8080/venta/${this.element.id}`, [{
            cantidad: this.form.value.cantidad,
            valorUnitario: this.form.value.valorUnitario
          }]).then(() => {
            this.dialog.close(true);
            Swal.fire('La venta se ha actulizo con exito');
            this.spinner = false;
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Problema al actualizar', error);
          });
          //si ocurrio un error en la validacion del formulario este no se enviara
          //y se imprimira el mensaje "Form error"
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

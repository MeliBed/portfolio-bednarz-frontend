import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Encabezado } from 'src/assets/data/Encabezado';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EncabezadoService } from 'src/app/servicios/encabezado.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  encabezadoList:Encabezado[] = [];
  isUserLogged: Boolean = false;
  encabezadoForm: FormGroup;

  

  constructor(private datosEncabezado:EncabezadoService,
              private autService: AutenticacionService, 
              private formBuilder: FormBuilder,) {
    this.encabezadoForm = this.formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      contacto: ['', [Validators.required, Validators.email]],
      linkedin: ['', [Validators.required]],
      github: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosEncabezado.obtenerDatosEncabezado().subscribe
    (encabezado =>{
      this.encabezadoList = encabezado;
    });

  }

  private loadForm(encabezado: Encabezado) {
    this.encabezadoForm.setValue({
      id: encabezado.id,
      titulo: encabezado.titulo,
      nombre: encabezado.nombre,
      foto: encabezado.foto,
      descripcion: encabezado.descripcion,
      ubicacion: encabezado.ubicacion,
      contacto: encabezado.contacto,
      linkedin: encabezado.linkedin,
      github: encabezado.github,
      })
  }
  
  onEditarEncabezado(index: number) {
    let encabezado: Encabezado = this.encabezadoList[index];
    this.loadForm(encabezado);

  }
  
  /*onNewEncabezado() {
    this.clearForm();
  }*/

  /*private clearForm() {
    this.encabezadoForm.setValue({
      id: '',
      titulo: '',
      nombre: '',
      foto: '',
      descripcionpersonal: '',
      ubicacion: '',
      email: '',
      linkedin: '',
      github: '',
    })
  }*/


  onSubmit() {
   
    console.log(this.encabezadoForm.value)
    let encabezado: Encabezado = this.encabezadoForm.value;
    this.datosEncabezado.modificarEncabezado(encabezado).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


  



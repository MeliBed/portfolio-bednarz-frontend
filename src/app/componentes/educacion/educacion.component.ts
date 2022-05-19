import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { Educacion } from 'src/assets/data/Educacion';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {
  educacionLista:Educacion[] = [];
  isUserLogged: Boolean = false;
  educationForm: FormGroup;
  
  imagenes:string[] = [ "../assets/Imagenes/AP en colores.PNG",
                        "../assets/Imagenes/CodoACodo_Logo.png", 
                        "../assets/Imagenes/logo-filo-uba.jpg",
                        "../assets/Imagenes/UTN_Logo.png",
                        "../assets/Imagenes/UTN_FRT_Logo.png"];


 
  constructor(
    private datosEducacion:EducacionService, 
    private autService: AutenticacionService, 
    private formBuilder: FormBuilder) {
      this.educationForm = this.formBuilder.group({
        id: [''],
        institucion: ['', [Validators.required, Validators.minLength(2)]],
        logo: ['', [Validators.required]],
        descripcion: ['', [Validators.required, Validators.minLength(2)]],
        inicio: ['', [Validators.required, Validators.minLength(4)]],
        fin: ['', [Validators.required, Validators.minLength(4)]],
      });
     }


  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosEducacion.obtenerDatosEducacion().subscribe
    (educacion =>{
      this.educacionLista = educacion;
   });
  }

  private clearForm() {
    this.educationForm.setValue({
      id: '',
      institucion: '', 
      logo: '', 
      descripcion:'', 
      inicio:'', 
      fin:'',
    })
  }

  private loadForm(educacion: Educacion) {
    this.educationForm.setValue({
      id: educacion.id,
      institucion: educacion.institucion, 
      logo: educacion.logo,
      descripcion:educacion.descripcion, 
      inicio:educacion.inicio, 
      fin:educacion.fin,
      })
  }


  onSubmit (){
    let educacion: Educacion = this.educationForm.value;
    if (this.educationForm.get('id')?.value == '') {
      this.datosEducacion.agregarNuevaEducacion(educacion).subscribe(
        (newEducation: Educacion) => {
          this.educacionLista.push(newEducation);
          this.reloadData();
        }
      );
    } else {
      this.datosEducacion.modificarEducacion(educacion).subscribe(
        () => {
          this.reloadData();
        }
      )
      }
  }
  
  onNewEducation() {
   
    this.clearForm();
    this.educationForm.reset(this.educationForm.value);
    
  }

  onEditEducation(index: number) {
    let educacion: Educacion = this.educacionLista[index];
    this.loadForm(educacion);
  }


onDeleteEducation (index: number) {
    let educacion: Educacion = this.educacionLista[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
       this.datosEducacion.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
}




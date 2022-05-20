import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Experiencia } from 'src/assets/data/Experiencia';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  experienciaLista:Experiencia [] = [];
  isUserLogged: Boolean = false;
  experienciaForm: FormGroup;
  imagenes:string[] = ["../assets/Imagenes/Aapra_Logo.jpg",
                       "../assets/Imagenes/CIRUELO.JPG", 
                       "../assets/Imagenes/RADAR.JPG",
                       "../assets/Imagenes/CONICET_Logo.png",
                       "../assets/Imagenes/MUSEO.PNG"];


  constructor(private datosExperiencia:ExperienciaService,
              private autService: AutenticacionService,
              private formBuilder: FormBuilder) {
                this.experienciaForm = this.formBuilder.group({
                  id: [''],
                  institucion: ['', [Validators.required, Validators.minLength(2)]],
                  logo: ['', [Validators.required]],
                  descripcion: ['', [Validators.required, Validators.minLength(5)]],
                  tarea: ['', [Validators.required, Validators.minLength(5)]],
                  inicio: ['', [Validators.required, Validators.minLength(4)]],
                  fin: ['', [Validators.required, Validators.minLength(4)]],
                });
               }

  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
  this.datosExperiencia.obtenerDatosExperiencia().subscribe
  (experiencia =>{
    this.experienciaLista = experiencia;
  });
  }

  private clearForm() {
    this.experienciaForm.setValue({
      id: '',
      institucion: '', 
      tarea: '',
      logo: '', 
      descripcion:'', 
      inicio:'', 
      fin:'',
    })
  }

  private loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      institucion: experiencia.institucion, 
      logo: experiencia.logo,
      tarea: experiencia.tarea,
      descripcion:experiencia.descripcion, 
      inicio:experiencia.inicio, 
      fin:experiencia.fin,
      })
  }

  onNewExperiencia() {
    this.clearForm();
    this.experienciaForm.reset(this.experienciaForm.value);
  }

  onEditExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaLista[index];
    this.loadForm(experiencia);
  }

  onDeleteExperiencia (index: number) {
    let experiencia: Experiencia = this.experienciaLista[index];
    if (confirm("¿Está seguro que desea borrar la experiencia seleccionada?")) {
       this.datosExperiencia.borrarExperiencia(experiencia.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onSubmit (){
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.datosExperiencia.agregarNuevaExperiencia(experiencia).subscribe(
        (newExperiencia: Experiencia) => {
          this.experienciaLista.push(newExperiencia);
          this.reloadData();
        }
      );
    } else {
      this.datosExperiencia.modificarExperiencia(experiencia).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
    this.reloadData();
  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { Proyecto } from 'src/assets/data/Proyecto';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectosLista:Proyecto [] = [];
  isUserLogged: Boolean = false;
  proyectoForm: FormGroup;
  imagenes:string[] = ["../assets/Imagenes/Index_CodoACodo.PNGg"];

  constructor(
    private datosProyectos:ProyectosService,
    private autService: AutenticacionService, 
    private formBuilder: FormBuilder) {
      this.proyectoForm = this.formBuilder.group({
        id: [''],
        descripcion: ['', [Validators.required, Validators.minLength(2)]],
        titulo: ['', [Validators.required, Validators.minLength(4)]],
        imagen: ['', [Validators.required, Validators.minLength(4)]],
        link: ['', [Validators.required, Validators.minLength(4)]],  
      });
     }

  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();
    
    this.reloadData();
   
  }

  private reloadData() {
     this.datosProyectos.obtenerDatosProyectos().subscribe
     (proyectos =>{
      this.proyectosLista = proyectos;
    });
  }

  private clearForm() {
    this.proyectoForm.setValue({
      id: '',
      descripcion:'', 
      titulo:'', 
      imagen:'',
      link:'',
    })
  }


  private loadForm(proyecto: Proyecto) {
    this.proyectoForm.setValue({
      id: proyecto.id,
      titulo: proyecto.titulo, 
      imagen: proyecto.imagen,
      descripcion:proyecto.descripcion, 
      link:proyecto.link, 
    })
  }

  onSubmit (){
    let proyecto: Proyecto = this.proyectoForm.value;
    if (this.proyectoForm.get('id')?.value == '') {
      this.datosProyectos.agregarNuevoProyecto(proyecto).subscribe(
        (newProyecto: Proyecto) => {
          this.proyectosLista.push(newProyecto);
          this.reloadData();
        }
      );
    } else {
      this.datosProyectos.modificarProyecto(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewProyecto() {
    this.clearForm();
    this.proyectoForm.reset(this.proyectoForm.value);
  }

  onEditProyecto(index: number) {
    let proyecto: Proyecto = this.proyectosLista[index];
    this.loadForm(proyecto);
  }

  onDeleteProyecto (index: number) {
    let proyecto: Proyecto = this.proyectosLista[index];
    if (confirm("¿Está seguro que desea borrar el proyecto seleccionado?")) {
       this.datosProyectos.borrarProyecto(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}


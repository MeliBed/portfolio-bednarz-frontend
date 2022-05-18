import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/servicios/skills.service';
import { Skill } from 'src/assets/data/Skill';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {

  skillsLista:Skill [] = [];
  isUserLogged: Boolean = false;
  skillForm: FormGroup;

  constructor(
    private datosSkills:SkillsService,
    private autService: AutenticacionService, 
    private formBuilder: FormBuilder) {
      this.skillForm = this.formBuilder.group({
        id: [''],
        acreditador: ['', [Validators.required, Validators.minLength(2)]],
        skill: ['', [Validators.required]],
        denominacion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
        nivel: ['', [Validators.required, Validators.minLength(4)]],
      });

     }

  ngOnInit(): void {
   this.isUserLogged = this.autService.isUserLogged();
    
    this.reloadData();
   
  }

  private reloadData() {
    this.datosSkills.obtenerDatosSkills().subscribe
    (skills =>{
      this.skillsLista = skills;
    });
}

private clearForm() {
  this.skillForm.setValue({
    id: '',
    acreditador: '', 
    skill: '', 
    denominacion:'', 
    nivel:'', 
  })
}

private loadForm(skill: Skill) {
  this.skillForm.setValue({
    id: skill.id,
    acreditador: skill.acreditador, 
    skill: skill.skill,
    denominacion:skill.denominacion, 
    nivel:skill.nivel, 
    })
}


onNewSkill() {
  this.clearForm();
}

onEditSkill(index: number) {
  let skill: Skill = this.skillsLista[index];
  this.loadForm(skill);
  }

onDeleteSkill (index: number) {
  let skill: Skill = this.skillsLista[index];
  if (confirm("¿Está seguro que desea borrar la skill seleccionada?")) {
     this.datosSkills.borrarSkill(skill.id).subscribe(
      () => {
        this.reloadData();
      }
    )
  }
}

onSubmit (){
  let skill:Skill = this.skillForm.value;
  if (this.skillForm.get('id')?.value == '') {
    this.datosSkills.agregarNuevaSkill(skill).subscribe(
      (newSkill: Skill) => {
        this.skillsLista.push(newSkill);
      }
    );
  } else {
    this.datosSkills.modificarSkill(skill).subscribe(
      () => {
        this.reloadData();
      }
    )
  }
}
}
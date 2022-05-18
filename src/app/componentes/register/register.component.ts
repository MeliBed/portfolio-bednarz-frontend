import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/servicios/register.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerLista:any[] = [];
  registerForm: FormGroup;

  constructor(private registerDatos:RegisterService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      enabled: [''],
    });
   }

  ngOnInit(): void {
  }


  onSubmit(){
    let usuario: any = this.registerForm.value;
    this.registerDatos.agregarNuevoUsuario(usuario).subscribe(
      (newUsuario: any) => {
        this.registerLista.push(newUsuario);
      });
      console.log(this.registerForm.value);
    

  }

}

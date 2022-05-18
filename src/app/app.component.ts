import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from './servicios/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio-web';
  isUserLogged: boolean = false;

  constructor(private autService: AutenticacionService) {}
  
  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();  
  }


}
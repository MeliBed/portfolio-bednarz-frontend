import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  isUserLogged: boolean = false;
  constructor(
    private autService: AutenticacionService) { }

  ngOnInit(): void {
    this.isUserLogged = this.autService.isUserLogged();
  }

  logout(): void {
    this.autService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }


}

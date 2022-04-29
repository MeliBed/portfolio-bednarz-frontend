import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatosEncabezado () :Observable<any> {
    return this.http.get('../assets/data/encabezado.json');
   
  }

  obtenerDatosEducacion () :Observable<any> {
    return this.http.get('../assets/data/educacion.json');
   
  }

  obtenerDatosExperiencia () :Observable<any> {
    return this.http.get('../assets/data/experiencia.json');
   
  }

  obtenerDatosProyectos () :Observable<any> {
    return this.http.get('../assets/data/proyectos.json');
   
  }
}

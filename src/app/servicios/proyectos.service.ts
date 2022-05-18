import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/assets/data/Proyecto';
import { config } from '../../assets/data/Config';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http:HttpClient) { }

 
  obtenerDatosProyectos () :Observable<any> {
    return this.http.get(config.baseUrl + "ver/proyecto");
   }

   agregarNuevoProyecto(proyecto:Proyecto): Observable<any> {
    return this.http.post<any>(config.baseUrl + "new/proyecto", proyecto);
  }

  modificarProyecto(proyecto: any): Observable<any> {
    return this.http.put<any>(config.baseUrl + "update/proyecto", proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "delete/proyecto/" + id);
  }

}

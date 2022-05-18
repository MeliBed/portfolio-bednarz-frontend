import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/assets/data/Educacion';
import { config } from '../../assets/data/Config';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http:HttpClient) {   }



   obtenerDatosEducacion () :Observable<any> {
    return this.http.get(config.baseUrl + "ver/educacion");
   }

   agregarNuevaEducacion(educacion:Educacion): Observable<any> {
    return this.http.post<any>(config.baseUrl + "new/educacion", educacion);
  }

  modificarEducacion(educacion: any): Observable<any> {
    return this.http.put<any>(config.baseUrl + "update/educacion", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "delete/educacion/" + id);
  }

  }

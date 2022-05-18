import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'src/assets/data/Experiencia';
import { config } from '../../assets/data/Config';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http:HttpClient) { }


  obtenerDatosExperiencia () :Observable<any> {
    return this.http.get(config.baseUrl + "ver/experiencia");
   }

   agregarNuevaExperiencia(experiencia:Experiencia): Observable<any> {
    return this.http.post<any>(config.baseUrl + "new/experiencia", experiencia);
  }

  modificarExperiencia(experiencia: any): Observable<any> {
    return this.http.put<any>(config.baseUrl + "update/experiencia", experiencia);
  }

  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "delete/experiencia/" + id);
  }
}


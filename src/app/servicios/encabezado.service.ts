import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../assets/data/Config';
import { Observable } from 'rxjs';
import { Encabezado } from 'src/assets/data/Encabezado';


@Injectable({
  providedIn: 'root'
})
export class EncabezadoService {


  constructor(private http:HttpClient) { }

  /*'../assets/data/encabezado.json'*/ 
  
  agregarNuevaEducacion(encabezado: Encabezado) {
    return this.http.post(config.baseUrl + "new/encabezado", encabezado);
  }

  obtenerDatosEncabezado () :Observable<any> {
    return this.http.get(config.baseUrl + "ver/encabezado");

  
  }

  modificarEncabezado (encabezado:Encabezado):Observable<any> {
     return this.http.put<any>(config.baseUrl + "update/encabezado", encabezado);
  }

}

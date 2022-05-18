import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/Config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  agregarNuevoUsuario(usuario:any): Observable<any> {
    return this.http.post<any>(config.baseUrl + "register", usuario);
  }

}

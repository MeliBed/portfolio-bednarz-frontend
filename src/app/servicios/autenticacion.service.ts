import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from 'src/assets/data/LoginDto';
import { config } from 'src/assets/data/Config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }


  public login(credentials: LoginDto) : Observable<Boolean> {
    return this.http.post<Boolean>(config.baseUrl + "login", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "mpbednarz");  
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }
}
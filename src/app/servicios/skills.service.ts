import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from 'src/assets/data/Skill';
import { config } from '../../assets/data/Config';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http:HttpClient) { }

  obtenerDatosSkills () :Observable<any> {
    return this.http.get(config.baseUrl + "ver/skill");
  }
  
  agregarNuevaSkill(skill:Skill): Observable<any> {
    return this.http.post<any>(config.baseUrl + "new/skill", skill);
  }

  modificarSkill(skill:Skill): Observable<any> {
    return this.http.put<any>(config.baseUrl + "update/skill", skill);
  }

  borrarSkill(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "delete/skill/" + id);
  }
}

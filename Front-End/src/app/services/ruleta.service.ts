import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuletaService {

  private url ="https://localhost:7099/";
  private apiUrl = "api/ruleta/"
  constructor(private   http:HttpClient) { }


    getLista():Observable<any>{
      return this.http.get(this.url+ this.apiUrl);
    
  }
  getId(id:any):Observable<any>{
    return this.http.get(this.url +this.apiUrl + id)
  }

    saveRuleta(ruleta:any):Observable<any>{
      return this.http.post(this.url + this.apiUrl, ruleta);
    }

    updateRuleta(id: number, ruleta:any):Observable<any>{
      return this.http.put(this.url +this.apiUrl + id, ruleta)
    }
}

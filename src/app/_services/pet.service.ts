import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<any> {
    let url = `${environment.apiUrl}/profiles`;
    return this.http.get(url)
  }

  save(petDto: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pet`, petDto);
  }
  saveVac(vacDTO: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/vacina`, vacDTO);
  }

  gettiposVac(): Observable<any> {
    let url = `${environment.apiUrl}/vacina-tipo`;
    return this.http.get(url)
  }

}
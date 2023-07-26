import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:4000';

  // * User
  checkApp(id: string): Observable<any>{
    return this._http.get(`${this.apiUrl}/check/dummy/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:3000';

  loginUser(username: string, userPassword: string): Observable<any>{
    return this._http.get(`${this.apiUrl}/user/${username}/${userPassword}`);
  }

  getStatus(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/login/status/user/${userID}`);
  }

  regisUser(data: any): Observable<any>{
    return this._http.post(`${this.apiUrl}/user/`, data);
  }

  getAllFace(): Observable<any> {
    return this._http.get(`${this.apiUrl}/user`);
  }

  getUserByFace(data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/user/face`, data);
  }
}

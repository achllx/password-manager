import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:3000';

  // * User
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

  getUserById(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/check/user/${userID}`);
  }

  changeUserPass(data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/update/user`, data);
  }

  userLogout(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/logout/user/${userID}`);
  }

  // * App
  getAppByUserId(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/app/user/${userID}`);
  }

  getAppById(appID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/app/${appID}`);
  }

  createApp(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/create/app`, data);
  }

  updateApp(appID: string, data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/app/update/${appID}`, data);
  }

  deleteApp(appID: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/app/${appID}`);
  }
}

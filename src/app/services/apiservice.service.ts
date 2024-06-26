import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../model/SignupRequest ';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private baseUrl = 'http://localhost:9000/ProjetPi/api/auth';

  constructor(private http: HttpClient) { }

  register(signUpRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signUpRequest, httpOptions);
  }
  verifyEmail(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify?code=` + code, httpOptions);
  }
  login(username, password) {
    return this.http.post(`${this.baseUrl}/signin`, { username: username, password: password },
      httpOptions);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`http://localhost:9000/ProjetPi/password/forgot-password?`+"email="+email, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:9000/ProjetPi/password/reset-password?`+"token="+token, { password });
  }
}

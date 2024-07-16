import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../model/SignupRequest ';
import { Observable } from 'rxjs';
import { User } from '../model/User';
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
  isAuthenticated(): boolean {
    // Vérifie si l'utilisateur est authentifié
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.roles && user.roles.length > 0 ? user.roles[0] : null;
  }
  countAllUsers(): Observable<number> {
    return this.http.get<number>(`http://localhost:9000/ProjetPi/stat/countAll`);
  }

  countUsersByRole(role: string): Observable<number> {
    return this.http.get<number>(`http://localhost:9000/ProjetPi/stat/count/${role}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:9000/ProjetPi/stat/users`);
  }

  exportUsers(): Observable<Blob> {
    return this.http.get(`http://localhost:9000/ProjetPi/stat/export-users`, { responseType: 'blob' });
  }

  
 
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:9000/ProjetPi/stat/delete/${userId}`);
  }
  addUser(user: any): Observable<any> {
    return this.http.post(`http://localhost:9000/ProjetPi/stat/add`, user);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:9000/ProjetPi/stat/find/${id}`);
  }

  updateUser( user: User): Observable<any> {
    return this.http.post(`http://localhost:9000/ProjetPi/stat/update`, user);
  }
  uploadProfileImage(id: number, file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    let user = {}
    user['image']= file

    return this.http.post(`http://localhost:9000/ProjetPi/stat/uploadProfileImage/${id}`, user);
  }

  getProfileImage(id: number): Observable<any> {
    return this.http.get(`http://localhost:9000/ProjetPi/stat/profileImage/${id}`, { responseType: 'json' });
  }

  
}

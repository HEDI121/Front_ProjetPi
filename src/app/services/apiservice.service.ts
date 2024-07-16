import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../model/SignupRequest ';
import { Observable, tap } from 'rxjs';
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
  /*login(username, password) {
    return this.http.post(`${this.baseUrl}/signin`, { username: username, password: password },
      httpOptions);
      
  }*/

      login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/signin`, { username, password }, httpOptions).pipe(
          tap(response => {
            // Assuming the response includes a token and user information
            localStorage.setItem('token', response.token);
            localStorage.setItem('authenticatedUser', JSON.stringify(response.user));
          }),
        
        );
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

  updateUser(user: any): Observable<any> {
    return this.http.post(`http://localhost:9000/ProjetPi/stat/update`, user);
  }
 
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:9000/ProjetPi/stat/delete/${userId}`);
  }
  /*getAuthenticatedUserId(): number {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData.id : null;
  }*/
    getAuthenticatedUserId(): string {
    
      const user = JSON.parse(localStorage.getItem('authenticatedUser') || '{}');
      return user.id || '';
    }
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    // Fonction pour définir le token d'authentification dans le stockage local
    setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  }




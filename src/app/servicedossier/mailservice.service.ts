import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private apiUrl = 'http://localhost:9000/ProjetPi/Email/sendEmail'; // URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, emailRequest);
  }
}

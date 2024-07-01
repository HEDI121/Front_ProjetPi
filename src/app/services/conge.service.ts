import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private apiUrl = 'http://localhost:8080/api/auth/conge';
  constructor(private http: HttpClient) { }
/*
  getCongesByUsername(username: string): Observable<Conge[]> {
    const url = `${this.apiUrl}/user/${username}`;
    return this.http.get<Conge[]>(url);
  }*/
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Conge } from '../model/conge';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private baseUrl = 'http://localhost:9000/ProjetPi/api/auth/conge';
  private geturl = 'http://localhost:9000/ProjetPi/api/auth/conge/all'

  constructor(private http: HttpClient) { }

  getAllConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`http://localhost:9000/ProjetPi/api/auth/conge/all`);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:9000/ProjetPi/api/auth/conge/allS`);
  }

  getCongeById(congeId: number): Observable<Conge>
  {
    return this.http.get<Conge>(`${this.baseUrl}/${congeId}`);
  }

  addConge(username: string, conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(`${this.baseUrl}/user/${username}/addC`, conge);
  }

  deleteConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/suppC/${id}`);
  }

  getCongesByUsername(username: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/user/${username}`);
  }

  approveConge(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.baseUrl}/${id}/approve`, null);
  }

  rejectConge(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.baseUrl}/${id}/reject`, null);
  }

  updateConge(conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.baseUrl}/upConge`, conge);
  }
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/test/${username}`);
  }
}

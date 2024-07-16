import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salaire } from '../model/salaire';
import {User } from '../model/User'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalaireService {

  private baseUrl = 'http://localhost:9000/ProjetPi/api/auth/salaire'; 
  private geturl = 'http://localhost:9000/ProjetPi/api/auth/salaire/all'
  private baseUrll = 'http://localhost:9000/ProjetPi/api/auth/conge';
  constructor(private http: HttpClient) { }

  addSalaire(salaire: Salaire): Observable<Salaire> {
    return this.http.post<Salaire>(`${this.baseUrl}/addSalaire`, salaire);
  }

  updateSalaire(salaire: Salaire): Observable<Salaire> {
    return this.http.put<Salaire>(`${this.baseUrl}/upSalaire`, salaire);
  }

  supprimerSalaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supp/${id}`);
  }
  addSalaireToUser(username: string, salaire: Salaire): Observable<Salaire> {
    return this.http.post<Salaire>(`${this.baseUrl}/Touser/${username}`, salaire);
  }

  deleteAllSalariesByUsername(username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteAll/${username}`);
  }

  getTotalSalaireByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total/${username}`);
  }

  getAverageSalaireByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average/${username}`);
  }

  getAllSalaries(): Observable<Salaire[]> {
    return this.http.get<Salaire[]>(`${this.geturl}`);
  }

  getSalaireById(id: number): Observable<Salaire> {
    return this.http.get<Salaire>(`${this.baseUrl}/${id}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrll}/test/${username}`);
  }

}

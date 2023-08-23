import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importer les interfaces ici si nécessaire
// Interface definitions
export interface ApiResponse {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": User[];
}
export interface Possession {
  "@id": string;
  "@type": string;
  nom: string;
  valeur: number;
  type: string;
}

export interface User {
  "@id": string;
  "@type": string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  tel: string;
  birthDate: string;
  possessions: Possession[];
}

export interface ApiDeleteResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiAllUsersUrl = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiAllUsersUrl);
  }

  deleteUser(id: number): Observable<ApiDeleteResponse> {
    const apiUrl = `http://127.0.0.1:8000/api/delete/${id}`;
    return this.http.delete<ApiDeleteResponse>(apiUrl);
  }

  getUserDetails(id: number): Observable<any> {
    const apiUrl = `http://127.0.0.1:8000/api/user/${id}`;
    return this.http.get<any>(apiUrl);
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    const birthMonth = birthDate.getMonth();
    const todayMonth = today.getMonth();
    const birthDay = birthDate.getDate();
    const todayDay = today.getDate();

    if (todayMonth < birthMonth || (todayMonth === birthMonth && todayDay < birthDay)) {
      age--;
    }

    return age;
  }
}

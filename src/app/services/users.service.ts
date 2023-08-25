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

export interface ApiModifResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApiResponse> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<ApiResponse>(url);
  }

  deleteUser(id: number): Observable<ApiModifResponse> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<ApiModifResponse>(url);
  }

  getUserDetails(id: number): Observable<User> {
    const url = `${this.apiUrl}/user/${id}`;
    return this.http.get<User>(url);
  }

  createUser(userData: User): Observable<ApiModifResponse> {
    const url = `${this.apiUrl}/new/user`;
    return this.http.post<ApiModifResponse>(url, userData);
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

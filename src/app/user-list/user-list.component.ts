import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/users.service";
import {Router} from "@angular/router";


import { ApiResponse, User } from "../services/users.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,
              private router: Router ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  navigateToUserDetails(url: string) {
    const userId = this.extractIdFromUrl(url);
    this.router.navigate(['/user', userId]);
  }

  extractIdFromUrl(url: string): number {
    const segments = url.split('/');
    const idSegment = segments[segments.length - 1];
    return parseInt(idSegment, 10);
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: ApiResponse) => {
        this.users = data['hydra:member'];
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(event: Event, url: string): void {
    event.preventDefault();

    const userId = this.extractIdFromUrl(url);

    if (isNaN(userId)) {
      console.log("Id inexistant");
      return;
    }

    // console.log('Démarrage de la suppression...');
    // console.log('ID utilisateur à supprimer:', userId);

    this.userService.deleteUser(userId).subscribe(
      (response) => {
        // console.log('Réponse de l\'API (succès) :', response);
        if (response.message === 'Utilisateur supprimé') {
          console.log('Utilisateur supprimé.');
          this.loadUsers();
        } else {
          console.error('Réponse inattendue de l\'API :', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression d\'utilisateur:', error);
      }
    );
  }




  calculateAge(dateOfBirth: string): number {
    return this.userService.calculateAge(dateOfBirth);
  }
}

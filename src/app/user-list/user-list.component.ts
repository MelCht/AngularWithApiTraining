import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/users.service";

import { ApiResponse, User } from "../services/users.service";
import {Router} from "@angular/router";


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

  deleteUser(url: string): void {
    const userId = this.extractIdFromUrl(url);

    if (isNaN(userId)) {
      console.log("Y'a une erreur id");
      return;
    }

    this.userService.deleteUser(userId).subscribe(
      (response) => {
        // Utilisez la console du navigateur pour des informations détaillées
        console.log('Network Request:', response);

        if (response.message === 'Utilisateur supprimé') {
          // Ne mettez pas loadUsers() ici
          // La suppression est effectuée, mais nous n'appelons pas loadUsers() tout de suite
        } else {
          console.error('Unexpected response:', response);
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );

    // Maintenant, appelez loadUsers() ici pour actualiser la liste après la suppression
    this.loadUsers();
  }

  calculateAge(dateOfBirth: string): number {
    return this.userService.calculateAge(dateOfBirth);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId?: number;
  userDetails: any = {};
  userPossessions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idFromUrl = params['id'];
      this.userId = this.extractIdFromUrl(idFromUrl);
      this.loadUserDetails();
    });
  }

  extractIdFromUrl(url: string): number {
    // This function extracts the numeric ID from the URL string
    const segments = url.split('/');
    const idSegment = segments[segments.length - 1];
    return parseInt(idSegment, 10);
  }

  loadUserDetails() {
    if (this.userId !== undefined) {
      this.userService.getUserDetails(this.userId).subscribe(
        userDetails => {
          this.userDetails = userDetails;
          this.userPossessions = userDetails.possessions;
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur :', error);
        }
      );
    }
  }
}

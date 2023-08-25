import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: [''],
      birthDate: ['']
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          // Traitez l'erreur ici, par exemple, affichez un message d'erreur dans l'interface
        }
      );
    }
  }
}

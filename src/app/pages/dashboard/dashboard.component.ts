import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/userResponse.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [CommonModule],
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: UserResponse | null = null;
  username: string = "";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const email = user ? JSON.parse(user).email : null;

    if (token && email) {
      this.userService.getUserByEmail(email, token).subscribe({
        next: (response) => {
          this.user = response;
          this.username = this.user.nombre;
        },
        error: (err) => {
          console.error('Error fetching user data', err);
          this.logout();
        }
      });
    } else {
      this.logout();
    }
  }

  logout(): void {
    // Limpiar cualquier dato de la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

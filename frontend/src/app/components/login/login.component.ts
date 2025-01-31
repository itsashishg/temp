
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';    
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean=false;
  constructor(private router: Router) {}
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onLogin() {
    if (this.username === 'aditi' && this.password === 'aditi') {
      localStorage.setItem('username', this.username);
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
 
 
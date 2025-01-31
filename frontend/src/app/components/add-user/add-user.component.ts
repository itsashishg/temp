import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AddDataService } from '../../services/add-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
 
export interface UserDialogData {
   id:number,
    username: string;
    password: string;
    confirmPassword: string;
    role: string; 
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent { 
  userForm: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = true; 

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,  
    private fb: FormBuilder,
    private upd: AddDataService,
    private snackbar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });

    if (this.data) {
      this.userForm.patchValue({
        username: this.data.username,
        password: this.data.password,
        confirmPassword: this.data.confirmPassword,
        role: this.data.role
      });
    }
    
      
  }

   
  

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
 
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
 
      if (user.password == user.confirmPassword) {
        this.upd.addUser(user).subscribe({
          next : (repsonse)=>{
              this.dialogRef.close(repsonse);
          },
          error:()=>{
            this.snackbar.open('Failed to add user!!', 'Close', {duration:5000});
          }
        });
        //this.dialogRef.close(user);   
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill out all fields correctly');
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();  
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserComponent, UserDialogData } from '../add-user/add-user.component';
import { AddDataService } from '../../services/add-data.service';

// interface dialogData {
//   username: string; password: string; confirmPassword: string; role: string
// }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  displayedColumns: string[] = ['username', 'password', 'role', 'edit', 'delete'];
  user: UserDialogData[] = [];

  constructor(private dialog: MatDialog, private upd: AddDataService) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
  ngOnInit(): void {
    this.upd.getUsers().subscribe((users) => {
      //console.log(users)
      this.user = users;
    });
  }
  userDelete(id:number):void{
      this.upd.deleteUser(id).subscribe({
        next:()=>{
          this.upd.getUsers().subscribe({
            next: (users) => {
              this.user = users; // Update the user list
            }
          
        });
      }
      });
   }
   
  openAddUserDialog(user: UserDialogData | null, id: number = -1): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      height: '500px',
      data: user ? { ...user, id } : { username: '', password: '', confirmPassword: '', role: '', id }

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (id !== -1) {
          this.upd.updateUser(result,id).subscribe({
            next:()=>{
            this.upd.getUsers().subscribe({
              next: (users) => {
                console.log(users)
                this.user = users; // Update the user list
              }
            
          });
        }
        })
        } else {
          //this.upd.addUser(result);
          this.upd.getUsers().subscribe((users) => {
            //console.log(users)
            this.user = users;
          });
        }

      }
    });
  }
}

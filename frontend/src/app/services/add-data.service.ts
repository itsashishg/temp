import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDialogData } from '../components/add-user/add-user.component';
 
@Injectable({
  providedIn: 'root',
})
export class AddDataService {
 
  private baseUrl= "http://localhost:8080/api/v1/users";
  constructor(private httpClient : HttpClient){}

  getUsers() : Observable<UserDialogData[]>{
    return this.httpClient.get<UserDialogData[]>(`${this.baseUrl}`);

  }

  addUser(users: UserDialogData): Observable<UserDialogData>{
    return this.httpClient.post<UserDialogData>(`${this.baseUrl}`, users);
  }

  updateUser(user: UserDialogData, id:number) : Observable<UserDialogData>{
    return this.httpClient.put<UserDialogData>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number) : Observable<UserDialogData>{
    return this.httpClient.delete<UserDialogData>(`${this.baseUrl}/${id}`);
  }
}
 
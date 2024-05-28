import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../shared/models/user-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  public updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${userId}`, user);
  }

  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${userId}`);
  }
}

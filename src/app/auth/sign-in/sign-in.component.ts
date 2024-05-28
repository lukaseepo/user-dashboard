import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserDashboardService} from '../../user-dashboard/user-dashboard.service';
import {User} from '../../shared/models/user-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public invalidCredentials = false;
  public users: User[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserDashboardService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.router.navigate(['/']);
    }
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      const authenticatedUser = this.users.find(user => user.email.toLowerCase() === email?.toLowerCase() && user.password === password);
      if (authenticatedUser) {
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        this.router.navigate(['/user-dashboard']);
      } else {
        this.invalidCredentials = true;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserDashboardService} from '../../user-dashboard/user-dashboard.service';
import {User} from '../../shared/models/user-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  public userExists = false;
  public registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserDashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      const newUser = this.registrationForm.value;
      const existingUser = this.users.find(user => user.email.toLowerCase() === newUser.email?.toLowerCase());
      if (existingUser) {
        this.userExists = true;
      } else {
        this.userService.createUser({admin: false, ...newUser as User}).subscribe(
          () => {
            this.router.navigate(['/auth/sign-in'])
            this.cdr.markForCheck();
          },
          (error) => {
            console.error('Error registering user:', error);
            this.cdr.markForCheck();
          }
        );
      }
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}

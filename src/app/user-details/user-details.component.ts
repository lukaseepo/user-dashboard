import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDashboardService} from "../user-dashboard/user-dashboard.service";
import {User} from "../shared/models/user-model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {
  public userExists = false;

  public userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    admin: [false]
  });

  public users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserDashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.getUsers();
    if(userId){
      this.userService.getUserById(userId).subscribe(
        (user: User) => {this.userForm.patchValue(user); this.cdr.markForCheck()},
        error => {console.error('Error fetching user details:', error); this.cdr.markForCheck()}
      );
    } else {
      this.userForm.patchValue(JSON.parse(localStorage.getItem('currentUser') as string))
    }
  }


  private getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      const currentUser = this.userForm.value;
      const existingUser = this.users.find(user => user.email.toLowerCase() === currentUser.email?.toLowerCase());
      const userId = Number(this.route.snapshot.paramMap.get('id')) ? Number(this.route.snapshot.paramMap.get('id')) : JSON.parse(localStorage.getItem('currentUser') as string).id ;
      if(existingUser && existingUser.email !== JSON.parse(localStorage.getItem('currentUser') as string).email){
        this.userExists = true;
      } else {
        this.userService.updateUser(userId, this.userForm.value as User).subscribe(
          () => {
            localStorage.setItem('currentUser', JSON.stringify({id: userId, ...this.userForm.value}));
            this.router.navigate(['/user-dashboard']);
            this.cdr.markForCheck();
          },
          error => {console.error('Error updating user:', error); this.cdr.markForCheck()}
        );
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}

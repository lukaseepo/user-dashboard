import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserDashboardService } from './user-dashboard.service';
import { User } from '../shared/models/user-model';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit {
  public displayedColumns: string[] = ['admin', 'name', 'email', 'actions'];
  public currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  public userData: User[] = [];
  public usersLoading = true;
  public skeletonFakeData = [
    { dummyData: '' },
    { dummyData: '' },
    { dummyData: '' },
    { dummyData: '' },
    { dummyData: '' },
  ];

  constructor(
    private userDashboardService: UserDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public deleteUser(id: string) {
    this.usersLoading = true;
    this.userDashboardService.deleteUser(id).subscribe(() => {
      this.getUsers();
    })
  }

  public promoteToAdmin(user: User) {
    this.usersLoading = true;
    this.userDashboardService.updateUser(user.id as string, {...user, admin: true}).subscribe(() => {
      this.getUsers();
    })
  }

  private getUsers(): void {
    this.userDashboardService.getUsers().subscribe((res: User[]) => {
      this.userData = res.filter((e) => e.id !== this.currentUser.id);
      this.usersLoading = false;
      this.cdr.markForCheck();
    });
  }
}

import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatTooltip,
    MatMenuTrigger,
    NgIf,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public currentUsername = localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser') as string).name;
  constructor(public router: Router) {}
  public logout():void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/sign-in']);
  }
}

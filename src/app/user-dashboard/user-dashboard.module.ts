import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from "./user-dashboard.component";
import {
  MatTableModule
} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HeaderComponent} from "../shared/components/header/header.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatTableModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    MatTooltipModule, HeaderComponent, NgxSkeletonLoaderModule
  ]
})
export class UserDashboardModule { }

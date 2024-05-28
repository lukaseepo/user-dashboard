import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import {HeaderComponent} from "../shared/components/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatButton
  ]
})
export class UserDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutes } from '../config/routes.config';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([
      { path: AppRoutes.errors.notFound, component: NotFoundComponent }
    ])
  ]
})
export class PagesModule { }

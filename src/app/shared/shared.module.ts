import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [LoadingComponent, PaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, PaginationComponent]
})
export class SharedModule { }

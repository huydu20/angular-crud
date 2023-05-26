import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [LoadingComponent, PaginationComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, PaginationComponent, ModalComponent]
})
export class SharedModule { }

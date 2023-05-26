import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() list: any = [];
  @Input() initialPage: number = 1;
  @Input() numOfItemOnPage: number = 5;
  @Input() pageSize: number = 3;
  @Output() changePage = new EventEmitter<any[]>();

  pageList: number[] = [];
  currentPage: number = this.initialPage;
  currentPageSize: number = this.pageSize;

  ngOnInit(): void {
    this.updatePageList();
  }
  ngOnDestroy(): void {}

  onChangePage(idx: number) {
    this.currentPage = idx;
    this.updateDisplayList(this.currentPage);
    this.updatePageList();
  }

  previousPage(previous: number) {
    this.currentPage = previous;
    this.updateDisplayList(previous);
    this.updatePageList();
  }

  nextPage(next: number) {
    this.currentPage = next;
    this.updateDisplayList(next);
    this.updatePageList();
  }

  updatePageList() {
    this.currentPageSize =
      Math.ceil(this.list.length / this.numOfItemOnPage) < this.pageSize
        ? Math.ceil(this.list.length / this.numOfItemOnPage)
        : this.pageSize;
    this.pageList = Array.from({ length: this.currentPageSize }, (v, i) => i + 1);
  }

  updateDisplayList(current: number) {
    const newList: any[] = this.list.slice((current - 1) * this.numOfItemOnPage, current * this.numOfItemOnPage);
    this.changePage.emit(newList);
  }
}

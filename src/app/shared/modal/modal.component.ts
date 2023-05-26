import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() title: string = ''
  @Input() content: string = ''
  @Output() onClose = new EventEmitter<boolean>()
  @Output() onAccept = new EventEmitter<boolean>()


  ngOnInit(): void {

  }

  onCloseModal() {
    this.onClose.emit(true)
  }

  onAcceptModal() {
    this.onAccept.emit(true)
  }
}

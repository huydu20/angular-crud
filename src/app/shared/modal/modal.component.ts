import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() title: string = ''
  @Input() content: string = ''
  @Output() onClose = new Subject<void>()
  @Output() onAccept = new Subject<void>()


  ngOnInit(): void {

  }

  onCloseModal() {
    this.onClose.next()
  }

  onAcceptModal() {
    this.onAccept.next()
  }
}

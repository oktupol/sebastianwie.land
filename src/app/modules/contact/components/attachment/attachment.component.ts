import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EncodingService } from '../../services/encoding.service';

@Component({
  selector: 'nwie-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() public control!: AbstractControl;

  @Output() public addAttachment = new EventEmitter<File>();

  @Output() public delete = new EventEmitter<void>();

  public inputId = this.generateRandomId();

  constructor(private encodingService: EncodingService) { }

  ngOnInit(): void {
  }

  private generateRandomId(): string {
    const randomBytes = new Uint8Array(5);
    crypto.getRandomValues(randomBytes);
    return 'nwie-attachment-' + this.encodingService.base32(randomBytes);
  }

  public onChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.addAttachment.emit(file);
      this.control.setValue(file);
    }
  }

  public get file(): File {
    return this.control.value;
  }

  public onDelete(): void {
    this.delete.emit();
  }
}

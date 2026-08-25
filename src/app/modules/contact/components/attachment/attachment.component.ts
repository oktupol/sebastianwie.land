import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EncodingService } from '../../services/encoding.service';

@Component({
    selector: 'nwie-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class AttachmentComponent {
  private encodingService = inject(EncodingService);

  public readonly control = input.required<AbstractControl>();

  public readonly addAttachment = output<File>();

  public readonly delete = output<void>();

  public inputId = this.generateRandomId();

  private generateRandomId(): string {
    const randomBytes = new Uint8Array(5);
    crypto.getRandomValues(randomBytes);
    return 'nwie-attachment-' + this.encodingService.base32(randomBytes);
  }

  public onChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.addAttachment.emit(file);
      this.control().setValue(file);
    }
  }

  public get file(): File {
    return this.control().value;
  }

  public onDelete(): void {
    this.delete.emit();
  }
}

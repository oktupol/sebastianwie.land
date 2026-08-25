import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { startWith, switchMap } from 'rxjs';
import { EncodingService } from '../../services/encoding.service';

@Component({
    selector: 'nwie-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentComponent {
  private encodingService = inject(EncodingService);

  public readonly control = input.required<AbstractControl>();

  public readonly addAttachment = output<File>();

  public readonly delete = output<void>();

  public inputId = this.generateRandomId();

  /**
   * A FormControl's value is not reactive on its own, so it is tracked through
   * valueChanges; otherwise the view would not update under OnPush.
   */
  public readonly file = toSignal<File | null>(
    toObservable(this.control).pipe(
      switchMap(control => control.valueChanges.pipe(startWith(control.value))),
    ),
    { initialValue: null },
  );

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

  public onDelete(): void {
    this.delete.emit();
  }
}

import { AfterViewInit, Component, DestroyRef, ElementRef, ChangeDetectionStrategy, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerificationResponse } from 'src/app/util/types';
import { VerificationService } from '../../services/verification.service';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'nwie-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ContentPageComponent, RouterLink, ReactiveFormsModule]
})
export class VerifyEmailComponent implements AfterViewInit {
  private verificationService = inject(VerificationService);
  private destroyRef = inject(DestroyRef);

  public readonly emailFileName = signal('');
  public readonly isDraggedOver = signal(false);
  public readonly verificationResponse = signal<VerificationResponse | undefined>(undefined);

  private readonly fileUploadBox = viewChild.required<ElementRef>('fileUploadBox');

  ngAfterViewInit(): void {
    const box = this.fileUploadBox().nativeElement as HTMLFormElement;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    for (let event of ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']) {
      box.addEventListener(event, preventDefault);
    }
  }

  selectFile(file: File) {
    this.emailFileName.set(file.name);

    this.verificationService.verify(file)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(result => {
        this.verificationResponse.set(result);
      });
  }

  onInputChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);

    if (file) {
      this.selectFile(file);
    }
  }

  onDrop(event: DragEvent) {
    const file = event.dataTransfer?.files.item(0);

    if (file) {
      this.selectFile(file);
    }
  }
}

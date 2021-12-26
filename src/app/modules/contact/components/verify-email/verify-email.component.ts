import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VerificationResponse } from 'src/app/util/types';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'nwie-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, AfterViewInit, OnDestroy {

  public emailFile?: File;
  public emailFileName: string = '';
  public isDraggedOver: boolean = false;

  public verificationResponse?: VerificationResponse;

  private destroy$ = new Subject<void>();

  @ViewChild('fileUploadBox') private fileUploadBox !: ElementRef;

  constructor(
    private verificationService: VerificationService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const box = this.fileUploadBox.nativeElement as HTMLFormElement;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    for (let event of ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']) {
      box.addEventListener(event, preventDefault);
    }
  }

  selectFile(file: File) {
    this.emailFile = file;
    this.emailFileName = file.name;


    this.verificationService.verify(file)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        this.verificationResponse = result;
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

import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { VerificationResponse } from 'src/app/util/types';

@Component({
  selector: 'nwie-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {

  public emailFile?: File;
  public emailFileName: string = '';
  public isDraggedOver: boolean = false;

  public verificationResponse?: VerificationResponse;

  @ViewChild('fileUploadBox') private fileUploadBox !: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = this.fileUploadBox.nativeElement as HTMLDivElement;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    for (let event of ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']) {
      div.addEventListener(event, preventDefault);
    }
  }

  selectFile(file: File) {
    if (file.type === 'message/rfc822') {
      this.emailFile = file;
      this.emailFileName = file.name;
    }
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

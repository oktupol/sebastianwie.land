import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';

@Component({
  selector: 'nwie-global-messages',
  templateUrl: './global-messages.component.html',
  styleUrls: ['./global-messages.component.scss']
})
export class GlobalMessagesComponent implements OnInit, OnDestroy {

  public globalMessages: GlobalMessage[] = [];
  private destroy$ = new Subject<void>();

  constructor(private globalMessagesService: GlobalMessagesService) { }

  ngOnInit(): void {
    this.globalMessagesService.getAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe(gm => this.globalMessages = gm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  remove(index: number) {
    this.globalMessagesService.remove(index);
  }
}

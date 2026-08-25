import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';

@Component({
    selector: 'nwie-global-messages',
    templateUrl: './global-messages.component.html',
    styleUrls: ['./global-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class GlobalMessagesComponent implements OnInit, OnDestroy {
  private globalMessagesService = inject(GlobalMessagesService);


  public globalMessages: GlobalMessage[] = [];
  private destroy$ = new Subject<void>();

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

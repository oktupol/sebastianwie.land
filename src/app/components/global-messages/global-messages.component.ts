import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';

@Component({
    selector: 'nwie-global-messages',
    templateUrl: './global-messages.component.html',
    styleUrls: ['./global-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalMessagesComponent {
  private globalMessagesService = inject(GlobalMessagesService);

  public readonly globalMessages = toSignal(this.globalMessagesService.getAll(), { initialValue: [] });

  remove(index: number) {
    this.globalMessagesService.remove(index);
  }
}

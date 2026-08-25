import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as navigationSelectors from '../../../store/selectors/navigation.selectors';

@Component({
    selector: 'nwie-content-page',
    templateUrl: './content-page.component.html',
    styleUrls: ['./content-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPageComponent {
  private store = inject(Store);

  public readonly navOpen = this.store.selectSignal(navigationSelectors.isOpen);
}

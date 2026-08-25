import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as titleSelectors from '../../store/selectors/title.selectors';
import { TitleComponent } from '../title/title.component';

@Component({
    selector: 'nwie-title-wrapper',
    templateUrl: './title-wrapper.component.html',
    styleUrls: ['./title-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TitleComponent]
})
export class TitleWrapperComponent {
  private store = inject(Store);

  public readonly position = this.store.selectSignal(titleSelectors.getPosition);
}

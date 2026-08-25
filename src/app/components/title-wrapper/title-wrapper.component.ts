import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Position } from 'src/app/util/types';
import * as titleSelectors from '../../store/selectors/title.selectors';
import { TitleComponent } from '../title/title.component';

@Component({
    selector: 'nwie-title-wrapper',
    templateUrl: './title-wrapper.component.html',
    styleUrls: ['./title-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TitleComponent]
})
export class TitleWrapperComponent implements OnInit, OnDestroy {
  private store = inject(Store);


  private destroy$ = new Subject<void>();

  public position!: string;

  ngOnInit(): void {
    this.store.select(titleSelectors.getPosition)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((position) => this.position = position);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}

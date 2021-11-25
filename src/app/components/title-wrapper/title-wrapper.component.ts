import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Position } from 'src/app/util/types';
import * as titleSelectors from '../../store/selectors/title.selectors';

@Component({
  selector: 'nwie-title-wrapper',
  templateUrl: './title-wrapper.component.html',
  styleUrls: ['./title-wrapper.component.scss']
})
export class TitleWrapperComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public position!: string;

  constructor(private store: Store) { }

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

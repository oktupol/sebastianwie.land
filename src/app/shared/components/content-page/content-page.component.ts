import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as navigationSelectors from '../../../store/selectors/navigation.selectors';

@Component({
  selector: 'nwie-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit, OnDestroy {

  public navOpen = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(navigationSelectors.isOpen)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(o => this.navOpen = o);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

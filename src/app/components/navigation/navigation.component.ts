import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import * as navigationSelectors from '../../store/selectors/navigation.selectors';
import * as navigationActions from '../../store/actions/navigation.actions';

@Component({
  selector: 'nwie-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public isHomepage = true;
  public navOpen = false;

  public readonly links = [
    { routerLink: '/', label: 'home' },
    { routerLink: '/sites/about', label: 'about '},
    { routerLink: '/contact', label: 'contact' },
  ]

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event: NavigationEnd) => {
        this.isHomepage = event.url === '/';
      });

    this.store.select(navigationSelectors.isOpen)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(o => this.navOpen = o);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public close(): void {
    this.store.dispatch(navigationActions.close());
  }

  public toggle(): void {
    this.store.dispatch(navigationActions.toggle());
  }
}

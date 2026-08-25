import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import * as navigationSelectors from '../../store/selectors/navigation.selectors';
import * as navigationActions from '../../store/actions/navigation.actions';

@Component({
    selector: 'nwie-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink]
})
export class NavigationComponent {
  private router = inject(Router);
  private store = inject(Store);

  public readonly isHomepage = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.url === '/'),
    ),
    { initialValue: true },
  );

  public readonly navOpen = this.store.selectSignal(navigationSelectors.isOpen);

  public readonly links = [
    { routerLink: '/', label: 'home' },
    { routerLink: '/sites/about', label: 'about '},
    { routerLink: '/contact', label: 'contact' },
    { routerLink: '/sites/pgp', label: 'pgp' },
    { routerLink: '/contact/verify', label: 'verify e-mail signature' },
  ]

  public close(): void {
    this.store.dispatch(navigationActions.close());
  }

  public toggle(): void {
    this.store.dispatch(navigationActions.toggle());
  }
}

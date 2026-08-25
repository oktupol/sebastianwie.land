import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContentPageComponent } from '../../shared/components/content-page/content-page.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'nwie-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ContentPageComponent, RouterLink]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';

@Component({
    selector: 'nwie-imprint',
    templateUrl: './imprint.component.html',
    styleUrls: ['./imprint.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ContentPageComponent]
})
export class ImprintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

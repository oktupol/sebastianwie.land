import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { from, interval, map, mergeMap, Subject, takeUntil, timer, zipWith } from 'rxjs';

@Component({
    selector: 'nwie-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

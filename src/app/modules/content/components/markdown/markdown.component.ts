import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownComponent as MarkdownComponent_1 } from 'ngx-markdown';

@Component({
    selector: 'nwie-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ContentPageComponent, MarkdownComponent_1]
})
export class MarkdownComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);


  public markdownFile: string = '';
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        map(data => data['markdownFile']),
        takeUntil(this.destroy$),
      ).subscribe(
        mf => this.markdownFile = mf
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import 'marked/lib/marked';
import 'prismjs/prism';
import 'prismjs/components/prism-json';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nwie-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, OnDestroy {

  public markdownFile: string = '';
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute) { }

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

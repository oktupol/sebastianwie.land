import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownComponent as MarkdownComponent_1 } from 'ngx-markdown';

@Component({
    selector: 'nwie-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ContentPageComponent, MarkdownComponent_1]
})
export class MarkdownComponent {
  private activatedRoute = inject(ActivatedRoute);

  public readonly markdownFile = toSignal(
    this.activatedRoute.data.pipe(map(data => data['markdownFile'] as string)),
    { initialValue: '' },
  );
}

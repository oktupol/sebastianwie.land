import { DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';
import { GlobalMessagesService } from '../../shared/services/global-messages.service';

import { GlobalMessagesComponent } from './global-messages.component';

@Injectable()
class MockGlobalMessagesService {
  // Per-instance so state cannot leak between tests.
  public readonly messages$ = new Subject<GlobalMessage[]>();

  add(message: GlobalMessage) {

  }

  remove(index: number) {

  }

  getAll() {
    return this.messages$;
  }
}

describe('GlobalMessagesComponent', () => {
  let component: GlobalMessagesComponent;
  let fixture: ComponentFixture<GlobalMessagesComponent>;

  let gm: MockGlobalMessagesService;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GlobalMessagesComponent],
    providers: [
        { provide: GlobalMessagesService, useClass: MockGlobalMessagesService }
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;

    gm = TestBed.inject(GlobalMessagesService) as unknown as MockGlobalMessagesService;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('message boxes', () => {
    it('should initially have no messages', () => {
      const boxes = el.queryAll(By.css('.gm-container > div'));

      expect(boxes.length).toBe(0);
    });

    it('should have as many boxes as there are messages', () => {
      const messages: GlobalMessage[] = [
        { message: 'Test Message 1', type: 'error' },
        { message: 'Test Message 2', type: 'info' },
        { message: 'Test Message 3', type: 'success' },
      ];

      gm.messages$.next(messages);
      fixture.detectChanges();

      const boxes = el.queryAll(By.css('.gm-container > div'));

      expect(boxes.length).toBe(messages.length);
    });
  });

  describe('remove', () => {
    it('should call service', () => {
      spyOn(gm, 'remove').and.callThrough();

      const messages: GlobalMessage[] = [
        { message: 'Test Message 1', type: 'error' },
        { message: 'Test Message 2', type: 'info' },
        { message: 'Test Message 3', type: 'success' },
      ];

      gm.messages$.next(messages);
      fixture.detectChanges();

      component.remove(0);

      expect(gm.remove).toHaveBeenCalledOnceWith(0);
    });
  });
});

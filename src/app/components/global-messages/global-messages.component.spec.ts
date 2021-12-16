import { DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of, Subject } from 'rxjs';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';
import { GlobalMessagesService } from '../../shared/services/global-messages.service';

import { GlobalMessagesComponent } from './global-messages.component';

const getAllSubject$ = new Subject<GlobalMessage[]>();
@Injectable()
class MockGlobalMessagesService {
  add() {

  }

  remove() {

  }

  getAll() {
    return getAllSubject$;
  }
}

describe('GlobalMessagesComponent', () => {
  let component: GlobalMessagesComponent;
  let fixture: ComponentFixture<GlobalMessagesComponent>;

  let gm: GlobalMessagesService;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalMessagesComponent ],
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

    gm = TestBed.inject(GlobalMessagesService);
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

      getAllSubject$.next(messages);
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

      getAllSubject$.next(messages);
      fixture.detectChanges();

      component.remove(0);

      expect(gm.remove).toHaveBeenCalledOnceWith(0);
    });
  });
});

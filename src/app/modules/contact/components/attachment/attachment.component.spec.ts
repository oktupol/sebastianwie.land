import { DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EncodingService } from '../../services/encoding.service';

import { AttachmentComponent } from './attachment.component';

@Injectable()
class MockEncodingService {
  private counter = 0;

  base32() {
    return 'encodedstring' + this.counter++;
  }
}
describe('AttachmentComponent', () => {
  let component: AttachmentComponent;
  let fixture: ComponentFixture<AttachmentComponent>;

  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentComponent ],
      providers: [
        { provide: EncodingService, useClass: MockEncodingService },
      ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();

    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create unique id for file input', () => {
    const fileInput = el.query(By.css('input[type=file]'));
    expect(fileInput.attributes['id']).toEqual('nwie-attachment-encodedstring0');

    const label = el.query(By.css('label'));
    expect(label.attributes['for']).toEqual('nwie-attachment-encodedstring0');
  });

  describe('display label only if control has no value', () => {
    it('positive case: control has no value', () => {
      const label = el.query(By.css('label'));
      expect(label).toBeTruthy();
    });

    it('negative case: control has value', () => {
      component.control.setValue({ name: 'somefile.txt' });
      fixture.detectChanges();

      const label = el.query(By.css('label'));
      expect(label).toBeFalsy();
    });
  });

  describe('display fileinfo only if control has value', () => {
    it('positive case: control has value', () => {
      component.control.setValue({ name: 'somefile.txt' });
      fixture.detectChanges();

      const fileInfo = el.query(By.css('.fileinfo'));
      expect(fileInfo).toBeTruthy();
      expect(fileInfo.nativeElement.textContent).toEqual('somefile.txt');
    });

    it('negative case: control has no value', () => {
      const fileInfo = el.query(By.css('.fileinfo'));
      expect(fileInfo).toBeFalsy();
    });
  });
});

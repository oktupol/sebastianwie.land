import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenpgpComponent } from './openpgp.component';

describe('OpenpgpComponent', () => {
  let component: OpenpgpComponent;
  let fixture: ComponentFixture<OpenpgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenpgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenpgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

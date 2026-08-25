import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { VerificationResponse } from 'src/app/util/types';
import { VerificationService } from '../../services/verification.service';

import { VerifyEmailComponent } from './verify-email.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

@Injectable()
class MockVerificationService {
  public verify(): Observable<VerificationResponse> {
    return of('good-signature');
  }
}
describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VerifyEmailComponent],
    providers: [
        provideMockStore(),
        provideRouter([]),
        { provide: VerificationService, useClass: MockVerificationService },
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

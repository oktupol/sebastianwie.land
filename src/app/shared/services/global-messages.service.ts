import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add, remove } from 'src/app/store/actions/global-messages.actions';
import { getMessages } from 'src/app/store/selectors/global-messages.selectors';
import { GlobalMessage } from '../interfaces/global-message';

@Injectable()
export class GlobalMessagesService {
  constructor(private store: Store) {}

  public add(message: GlobalMessage) {
    this.store.dispatch(add({ message }));
  }

  public remove(index: number) {
    this.store.dispatch(remove({ index }));
  }

  public getAll(): Observable<GlobalMessage[]> {
    return this.store.select(getMessages);
  }
}

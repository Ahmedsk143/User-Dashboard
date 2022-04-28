import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public isLoading = new Subject<boolean>();
  public showQR = new Subject<boolean>();
  public sentMessage = new BehaviorSubject<{ message: string; error: boolean }>(
    { message: '', error: false }
  );
  constructor() {}
}

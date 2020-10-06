import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInServiceService {

  private loggedInValid = new BehaviorSubject<Boolean>(false)
  loggedInValidator = this.loggedInValid.asObservable()

  constructor() { }

  verifyLogin(loggedIn){
    this.loggedInValid.next(loggedIn)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchinteractionService {

  private homeSearchSource = new BehaviorSubject<String>("")
  homeSearch$ = this.homeSearchSource.asObservable()
  constructor() { }

  relaySearch(searchQuery: String){
    this.homeSearchSource.next(searchQuery)

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from "../models/user"
import { Observable } from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private id = new BehaviorSubject<string>("")
  userId = this.id.asObservable()
 

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  saveUser (user : User){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    this.http.post("users/saveUser", user, httpOptions).toPromise().then(data => {
    })

   
  }

  public checkValid(token: String) {
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("users/checkValid", {token}, httpOptions)

  }

  public getUser(email:String, password:String): Observable<any> {
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("users/fetchById", {email, password}, httpOptions);

  }
  
  public retrieveRecipies(token){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post("users/retrieveContent", {token}, httpOptions)
  }

  public updateUser(recipe, token){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    var url = "users/update"   
    return this.http.put(url, {recipies:recipe, token},  httpOptions).subscribe(data => console.log(data));
  }

  public deleteItem(recipe, token){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    var url = "users/deleteItem"

    this.http.put(url, {recipies: recipe, token},  httpOptions).subscribe(data => console.log(data));

  }

  updateId(newId){
    this.id.next(newId)

  }

  setLocalStorage(user){

    this.localStorage.store("userInfo", user)
    
  }

  getLocalStorage(){
    
    var userId = this.localStorage.retrieve("userInfo")
    if(userId == null){
      return null
    }
    else{
      return userId
    }
  }

  getLocalStorageEmail(){
    var userEmail = this.localStorage.retrieve("userEmail")
    if(userEmail == null){
      return null
    }
    else{
      return userEmail
    }
  }

  clearLocalStorage(){

    this.localStorage.clear("userInfo")
    this.updateId("");
    this.localStorage.clear("userEmail")

    
  }
}




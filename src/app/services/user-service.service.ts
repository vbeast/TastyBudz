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
    console.log("saving user: ", user);

    this.http.post("http://localhost:3000/users/saveUser", user, httpOptions).toPromise().then(data => {
      console.log(data)
    })

    console.log(this.id)

   
  }

  public checkValid(token: String) {
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("http://localhost:3000/users/checkValid", {token}, httpOptions)

  }

  public getUser(email:String, password:String): Observable<any> {
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    console.log("fetching user from database");
    return this.http.post("http://localhost:3000/users/fetchById", {email, password}, httpOptions);

  }
  
  public retrieveRecipies(token){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post("http://localhost:3000/users/retrieveContent", {token}, httpOptions)
  }

  public updateUser(recipe, token){
    console.log("in userService")
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    // console.log("in user service updateUser function adding to this Id: " + userId)
    // console.log("in user service updateUser function adding this recipe:" + JSON.stringify(recipe))
    var url = "http://localhost:3000/users/update"
    console.log(url)
   
    return this.http.put(url, {recipies:recipe, token},  httpOptions).subscribe(data => console.log(data));
  }

  public deleteItem(recipe, token){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    var url = "http://localhost:3000/users/deleteItem"

    this.http.put(url, {recipies: recipe, token},  httpOptions).subscribe(data => console.log(data));

  }

  updateId(newId){
    console.log("update to:"+ newId)
    this.id.next(newId)

  }

  setLocalStorage(user){

    // this.updateId("userInfo")
    this.localStorage.store("userInfo", user)
    // this.localStorage.store("userEmail", user.email)
    
  }
  
  printId(){
    return (this.id)
  }

  getLocalStorage(){
    
    var userId = this.localStorage.retrieve("userInfo")
    console.log("getstorage: "+ userId)
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




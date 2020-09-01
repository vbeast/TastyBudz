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

  public getUser(email:String): Observable<any> {
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    console.log("fetching user from database");
    return this.http.get("http://localhost:3000/users/fetchById/" + email, httpOptions);
  
  }

  public updateUser(recipe, userId){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    console.log("in user service updateUser function adding to this Id: " + userId)
    console.log("in user service updateUser function adding this recipe:" + JSON.stringify(recipe))
    var url = "http://localhost:3000/users/update/" + userId;
    console.log(url)
   
    //var recipe = JSON.stringify(recipe)
    this.http.put(url, recipe,  httpOptions).subscribe(data => console.log(data));
  }

  public deleteItem(recipe, userId){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    var url = "http://localhost:3000/users/deleteItem/" + userId;

    this.http.put(url, recipe,  httpOptions).subscribe(data => console.log(data));

  }

  updateId(newId){
    console.log("update to:"+ newId)
    this.id.next(newId)

  }

  setLocalStorage(user){

    this.updateId("userInfo")
    this.localStorage.store("userInfo", user._id)
    this.localStorage.store("userEmail", user.email)
    
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




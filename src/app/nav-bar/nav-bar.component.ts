import { Component, OnInit } from '@angular/core';
import {Navbar} from "../navbar";
import {Router} from "@angular/router";
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean;

  navbar: Navbar = {
    about: "About",
    home: "Home",
    name: "MyWebsite",
    contact: "Contact",
    myprofile: "Profile"

  }



  constructor(private router: Router, private userService: UserService) { 
   

  }

  ngOnInit(): void {
    var isLoggedIn = this.userService.getLocalStorage()
    console.log("onInit: " + isLoggedIn)
   this.userService.userId.subscribe(id =>{
      console.log(id)
      
   })
    if(isLoggedIn == null){
      this.loggedIn = false
    }
    else{
      this.loggedIn = true;
    }
  
  }

  goToHome(){
    this.router.navigate(["/home",])
  }
  goToSignin(){
    this.router.navigate(["/signin",])
    this.userService.userId.subscribe(id =>{
      console.log(id)
      if(id == "userInfo"){
        this.loggedIn = true
      }
    })
  }
  goToSignup(){
    this.router.navigate(["/signup",])
  }
  
  signOut(){
    this.userService.clearLocalStorage()
    this.loggedIn=false;
  }
  id(){
    console.log (this.userService.printId())
  }

}

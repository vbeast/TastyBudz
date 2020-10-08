import { Component, Input, OnInit } from '@angular/core';
import {Navbar} from "../navbar";
import {Router} from "@angular/router";
import { UserService } from '../services/user-service.service';
import { SearchinteractionService } from '../searchinteraction.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import {LoggedInServiceService} from'../logged-in-service.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn: Boolean;
  sendquery;
  query;
  @Input() onHomepage: boolean;

  navbar: Navbar = {
    about: "About",
    home: "Home",
    name: "MyWebsite",
    contact: "Contact",
    myprofile: "Profile"

  }



  constructor(private router: Router, private userService: UserService, private searchService: SearchinteractionService, private LoggedInService: LoggedInServiceService) { 
   

  }

  ngOnInit(): void {
    var isLoggedIn = this.userService.getLocalStorage()
    if(isLoggedIn != null){
        var token = isLoggedIn.token
        this.userService.checkValid(token).subscribe(
          data=>{
          this.loggedIn = true
          this.LoggedInService.verifyLogin(this.loggedIn)
        },
        error=> {
          console.log(error.status)
          this.loggedIn = false
          this.LoggedInService.verifyLogin(this.loggedIn)
        })
      }
    else{
      this.loggedIn= false
    }
  }
  goToProfile(){
    this.router.navigate(["/profilepage",])
  }
  goToHome(){
    this.router.navigate(["",])
  }
  goToSignin(){
    this.router.navigate(["/signin",])
  }
  goToSignup(){
    this.router.navigate(["/signup",])
  }
  
  signOut(){
    this.userService.clearLocalStorage()
    this.loggedIn=false;
    this.LoggedInService.verifyLogin(this.loggedIn)
    this.goToHome()
  }

  goToViewRecipies(){
    this.sendquery=this.query
    this.searchService.relaySearch(this.sendquery)
    this.router.navigate(["/viewrecipes",])
  }

}

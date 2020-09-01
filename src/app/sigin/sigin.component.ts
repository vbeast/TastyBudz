import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user-service.service';
import {Router} from "@angular/router";
import { stringify } from 'querystring';
import { async } from '@angular/core/testing';
//import { SignupComponent } from './signup/signup.component';
import {NavBarComponent} from "src/app/nav-bar/nav-bar.component"

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  
  email: String;
  password: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

validate(){
  
  this.userService.getUser(this.email).subscribe(data => {

    if (this.password == data.password) {
      this.userService.setLocalStorage(data)
      this.router.navigate(["/home"])
    }
    
  });
}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {Signup} from "../signup";
import {Router} from "@angular/router";
import {User} from "../models/user"
import { UserService } from '../services/user-service.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild("email")emailModel;
  @ViewChild("firstname")firstnameModel;
  @ViewChild("lastname")lastnameModel;
  @ViewChild("password")passwordModel;
  @ViewChild("password2")password2Model;

  sheet: Signup = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: ""
  };

  
  

  constructor(private _router: Router, private userService: UserService) { 

    
  }


  ngOnInit(): void {
    

  }

  
log(){
  console.log(this.emailModel.errors["required"])
  console.log(this.emailModel.errors["email"])
}
  

  goToSignIn () {

  
     if((this.sheet.password == this.sheet.password2) && (this.emailModel.errors == null) && (this.passwordModel.errors == null) && (this.password2Model.errors == null)){
       var user = new User;

       user.firstname = this.sheet.firstname;
       user.email = this.sheet.email;
       user.lastname = this.sheet.lastname;
       user.password = this.sheet.password;
       user.recipies;

       console.log("saving user from component: ", user);

       this.userService.saveUser(user);

      this._router.navigate(["/signin",])
     }
     else{
       return
     }

  }
}
		
		
		
	




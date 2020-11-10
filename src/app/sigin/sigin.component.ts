import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user-service.service';
import {Router} from "@angular/router";

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
  
  this.userService.getUser(this.email, this.password).subscribe(data => {

    if (data.token != null) {
      this.userService.setLocalStorage(data)
      this.router.navigate([""])
    }
    
  });
}

}

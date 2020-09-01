import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  dishes = []
  user;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var userEmail = this.userService.getLocalStorageEmail()
    this.userService.getUser(userEmail).subscribe( data => {
      this.user = data;
      this.dishes = this.user.recipies
    })
    
    console.log(this.dishes)
  }

  setDishes() {
   
    console.log(this.user.recipies)
    this.dishes = this.user.recipies

  }

  

}

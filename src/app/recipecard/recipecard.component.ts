import { Component, OnInit, Input, Output} from '@angular/core';
import {recipeCard} from 'src/app/recipecard/recipecard';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
import {Router} from "@angular/router";
import { RecipeService } from '../services/recipe.service';
import {animate, trigger, transition, style} from '@angular/animations'
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity:1}))
      ])
    ])
  ]
})
export class RecipecardComponent implements OnInit {

  @Input() dishes: any[]= []
  @Input () fromProfilePage: boolean = false;
  @Output () deletion: EventEmitter<any> = new EventEmitter();
  @Output () saved: EventEmitter<any> = new EventEmitter();
  //heart = false;
  heart = new Array(this.dishes.length).fill(false)
  

  recipeCard: recipeCard = {
    imageUrl: "",
    recipeName: ""
  }

  constructor(private userService: UserService, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    
  }

  addToCookbook(i, dish:any){
    this.heart[i] = !this.heart[i]
    this.saved.emit(true)
    var recipeObject = dish.recipe
    console.log(recipeObject)
    var userId = this.userService.getLocalStorage()
    console.log("in add to cookbook: "+ userId.token)

    this.userService.updateUser(recipeObject, userId.token)
  }

  deletionHappened(dish){
    var deletionObject = [true, dish]
    this.deletion.emit(deletionObject)
  }

  deleteDish(i, dish) {

    var recipeObject = dish
    // console.log(recipeObject)
    var userInfo = this.userService.getLocalStorage()
    var deleted = this.dishes.splice(i,1)
    this.userService.deleteItem(recipeObject, userInfo.token)
    
  }
  removeFromCookbook(i, dish){
    this.heart[i] = !this.heart[i]
    var recipeObject = dish.recipe
    console.log(recipeObject)
    var userInfo = this.userService.getLocalStorage()
    // var deleted = this.dishes.splice(i,1)
    this.userService.deleteItem(recipeObject, userInfo.token)
  }

  viewRecipe(dish){
      window.open(dish.recipe.url, '_blank');
  }
}




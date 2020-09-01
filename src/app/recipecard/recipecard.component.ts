import { Component, OnInit, Input} from '@angular/core';
import {recipeCard} from 'src/app/recipecard/recipecard';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
import {Router} from "@angular/router";
import { RecipeService } from '../services/recipe.service';
@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent implements OnInit {

  @Input() dishes: any[]= []
  @Input () fromProfilePage: boolean = false;
  //heart = false;
  heart = new Array(this.dishes.length).fill(false)
  

  recipeCard: recipeCard = {
    imageUrl: "",
    recipeName: ""
  }

  constructor(private flashMessagesService: FlashMessagesService, private userService: UserService, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    
  }

  addToCookbook(i, dish:any){
    this.heart[i] = !this.heart[i]
    
    var recipeObject = dish.recipe
    console.log(recipeObject)
    var userId = this.userService.getLocalStorage()
    console.log("in add to cookbook: "+ userId)

    this.userService.updateUser(recipeObject, userId)
  }

  deleteDish(i, dish) {

    var recipeObject = dish
    console.log(recipeObject)
    var userId = this.userService.getLocalStorage()
    var deleted = this.dishes.splice(i,1)
    this.userService.deleteItem(recipeObject, userId)
    
  }

  viewRecipe(i){
    // this.router.navigate(["/home"])
    var dish = this.dishes[i]
    // this.recipeService.convertRecipe(dish.recipe.url).then((data)=> {
    //   console.log(data)
    // })
  }
}




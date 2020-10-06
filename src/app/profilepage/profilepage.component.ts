import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
// import { type } from 'os';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  dishes = []
  user;
  cuisineTypes = []
  allCuisines
  LoggedIn: boolean
  backupCuisines

  picarray = ['https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg', 'https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg', 'https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg', 'https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg', 'https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg', 'https://i.insider.com/5ad8e2b9bd967120008b4656?width=1136&format=jpeg' ]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var userInfo= this.userService.getLocalStorage()
    if(userInfo == null){
      this.LoggedIn = false
    }
    else{
      this.userService.retrieveRecipies(userInfo.token).subscribe( data => {
        this.user = data;
        this.dishes = this.user.recipies        
      },
      (err) => {
        return
      },
      () => {
        this.setDishes()
        this.backupCuisines = this.allCuisines
      }
      );
    }
  }


  checkEmpty(deleted){
    if(deleted[0]){
      this.allCuisines.forEach((value, key) => {
        console.log(value)
        if(value.length == 0){
          console.log("in here")
            this.allCuisines.delete(key)
        }
    })    
    }
    if(deleted[1] != null){
      this.backupCuisines.forEach((value, key) => {
        var recipeArr = value
        for(var i=0;i<recipeArr.length; i++){
            var currentDish = recipeArr[i]
            if(currentDish == deleted[1]){
              recipeArr.splice(i,1)
            }
        }
      })
    }
  }

  setDishes() {
   
    this.dishes = this.user.recipies

    this.allCuisines = new Map()

    for(var i=0; i < this.dishes.length; i++){
      if("cuisineType" in this.dishes[i]){
        var cuisine = this.dishes[i].cuisineType[0]

        if (this.allCuisines.has(cuisine) == false){
          this.allCuisines.set(cuisine, [this.dishes[i]])
        }
        else{
        var cuisineDishes = this.allCuisines.get(cuisine)
        cuisineDishes.push(this.dishes[i])
        }
      }
      else{
        if(this.allCuisines.has("Other") == true){
          var cuisineDishes = this.allCuisines.get("Other")
          cuisineDishes.push(this.dishes[i])
        }
        else{
          this.allCuisines.set("Other", [this.dishes[i]])
        }
      }
    }
  }

  outputEventHandler(eventObj){
    if(eventObj[0] == "recipe"){
      var recipeName = eventObj[1]
      this.findSpecRecipe(recipeName)
    }

  }

  findSpecRecipe(recipeName){
    if(recipeName == ""){
      this.allCuisines = this.backupCuisines
    }

    var tempMap = new Map()
   
    for(let [key, value] of this.backupCuisines){
        var recipeArr = value
        var filteredDishes = []
        var mapKey = key
        for(var i =0; i<recipeArr.length; i++){
            var dish = recipeArr[i]
            var label = recipeArr[i].label.toUpperCase()
            if(label.includes(recipeName.toUpperCase())){
              filteredDishes.push(dish)
            }
        }
        if(filteredDishes.length > 0){
          tempMap.set(mapKey, filteredDishes)
        }
    }
    this.allCuisines = tempMap
    
  }
  

}

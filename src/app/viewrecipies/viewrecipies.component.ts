import { Component, OnInit } from '@angular/core';
import {HomepageComponent} from 'src/app/homepage/homepage.component'
import { RecipeService } from '../services/recipe.service';
import { SearchinteractionService } from '../searchinteraction.service';
import {SessionStorageService} from 'ngx-webstorage';
import {LoggedInServiceService} from'../logged-in-service.service'


@Component({
  selector: 'app-viewrecipies',
  templateUrl: './viewrecipies.component.html',
  styleUrls: ['./viewrecipies.component.css']
})
export class ViewrecipiesComponent implements OnInit {
  newsearch
  dishes=[]
  showDishes = []
  rootDishes = []
  showSpinner = true;
  ingredFilters = []

  notifRendering: boolean;
  showNotif = false;
  notifExit: string;
  notifContent: string;
  
  loggedIn:Boolean;

  constructor(private homepage:HomepageComponent, private recipeService:RecipeService, 
    private searchService: SearchinteractionService, private sessionStorage: SessionStorageService,
    private LoggedInService: LoggedInServiceService) { }

  ngOnInit(): void {
      this.LoggedInService.loggedInValidator.subscribe(
        data => {
          this.loggedIn = data
        }
      ).unsubscribe()
      this.searchService.homeSearch$.subscribe(
          data => {
            if(data !== ""){
              this.setSessionStorage(data)
            }
          }).unsubscribe()
          var searchQuery = this.getSessionStorage("searchQuery")
       
          this.fetchRecipe(searchQuery)

  }

  recipeWasSaved(saved){
    if(this.loggedIn != true){
      this.notifContent = "You Must Login To Save Recipes"
      this.notifExit = "notification is-danger animate__animated animate__fadeOut animate__delay-1s"
      this.showHideNotif()
      return
    }
    if(saved){
      this.notifContent = "Recipe Saved To Your Profile"
      this.notifExit = "notification is-success animate__animated animate__fadeOut animate__delay-1s"
      this.showHideNotif()
    }
    
  }



  addFilterIngred(ingred){
    if(ingred[0]=="ingred"){
      this.ingredFilters.push(ingred[1])
      this.filterRecipes(ingred[1])
    }
    if(ingred[0] == "cookTime" && ingred[2] == false){
      this.filterCookTimes(ingred[1])
    }
    if(ingred[0] == "cookTime" && ingred[2] == true){
      this.revertDishes(null)
      this.filterCookTimes(ingred[1])
    }
    if(ingred[0] == "cookTime" && ingred[2] == null){
      this.revertDishes(null)
    }
    if(ingred[0] == "cals"){
      this.filterCalories(ingred[1])

    }

  }


  setShowDishes(){
    if(this.dishes.length < 10){
      this.showDishes = this.dishes
    }
    else{
      this.showDishes = this.dishes.slice(0,11)
    }
  }

  filterCookTimes(maxCookTime){
    var filteredDishes = []

    for(var i =0; i<this.dishes.length; i++){
        var currentDish = this.dishes[i]
        var cookTime = this.dishes[i].recipe.totalTime
        if(cookTime < maxCookTime){
          filteredDishes.push(currentDish)
        }
    }
    this.dishes = filteredDishes
    this.setShowDishes()
  }

  filterCalories(maxCals){
    var filteredDishes = []
    for(var i =0; i<this.dishes.length; i++){
        var dish = this.dishes[i]
        var calories = this.dishes[i].recipe.calories
        var servings = this.dishes[i].recipe.yield
        var servingCals = calories/servings
        if(calories == 0 || servings == 0){
          continue
        }
        if(servingCals < maxCals){
          filteredDishes.push(dish)
        }
    }
    if(filteredDishes.length == 0){
      this.notifContent = "No Results Found"
      this.notifExit = "notification is-danger animate__animated animate__fadeOut animate__delay-1s"
      this.showHideNotif()
    }
    else{
      this.dishes = filteredDishes
    }
    this.setShowDishes()
  }

  showHideNotif(){
      if(this.notifRendering == true){
        return
      }
      this.notifRendering = true
      this.showNotif = !this.showNotif
      setTimeout(()=>{
        this.showNotif = !this.showNotif
        this.notifRendering = false
      }, 2000)      
  }

  setSessionStorage(searchQuery){
    this.sessionStorage.store("searchQuery", searchQuery)
  }
  getSessionStorage(key){
    return this.sessionStorage.retrieve(key)
  }

  fetchRecipe(searchRequest: any){
    this.showDishes = []
    this.showSpinner = true
    this.setSessionStorage(searchRequest)
    this.recipeService.getRecipe(searchRequest).subscribe((data:any) => {
      try {
        this.dishes = data.recipies.hits
        this.rootDishes = data.recipies.hits
        if(this.dishes.length >= 10){
          this.showDishes = this.dishes.slice(0,11)
        }
        else{
          this.showDishes = this.dishes
        }
        this.showSpinner = false
      } catch (error) {
      }
     
    })
    }
  
  loadMore(){
   
    if(this.showDishes.length == this.dishes.length){   
      return
    }
    if((this.dishes.length - this.showDishes.length) >= 10){
      var tempArr = this.dishes.slice(this.showDishes.length, this.showDishes.length + 10)
      this.showDishes = this.showDishes.concat(tempArr)
    }
    else{
      var tempArr = this.dishes.slice(this.showDishes.length, this.dishes.length)
      this.showDishes = this.showDishes.concat(tempArr)
      
      
    }
  }

  
filterRecipes(ingred){
      var filteredDishes = []
      for(var i=0; i<this.dishes.length; i++){
        var dish = this.dishes[i]
        var ingredientList = this.dishes[i].recipe.ingredientLines
        
        for(var z=0; z<ingredientList.length; z++){
            var ingredientLine = ingredientList[z]
            if(ingredientLine.includes(ingred)){
              filteredDishes.push(dish)
              break
            }
      }
    }
  this.dishes = filteredDishes
  this.showDishes = filteredDishes.slice(0,11)
}

revertDishes(ingred){
  if(ingred != null){
    for(var i=0; i< this.ingredFilters.length; i++){
        if(this.ingredFilters[i] == ingred){
          this.ingredFilters.splice(i,1)
        }
    }
  }
  var ingreds = this.ingredFilters
  if(ingreds.length == 0){
    this.dishes = this.rootDishes
    this.setShowDishes()
  }

  var updatedDishes = this.rootDishes
  for(var i=0; i<ingreds.length; i++){
      var currentingred = ingreds[i]
      var filteredDishes = []
      for(var q=0; q<updatedDishes.length; q++){
        var ingredientLines = updatedDishes[q].recipe.ingredientLines
        var dish = updatedDishes[q]
        
        for(var z=0; z<ingredientLines.length; z++){
          var currentLine = ingredientLines[z]
          
          if(currentLine.includes(currentingred)){
              filteredDishes.push(dish)
              break
          }
        }
      }
      updatedDishes = filteredDishes
  }

    this.dishes = updatedDishes
    this.setShowDishes()
}

}



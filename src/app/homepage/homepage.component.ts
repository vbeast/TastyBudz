import { Component, OnInit,} from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import {Router} from "@angular/router";
import { SearchinteractionService } from '../searchinteraction.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private recipeService:RecipeService, private router: Router, private searchService: SearchinteractionService) { }

  data:any;
  imageUrl:"";
  query: String;
  cookbook = new Map()
  dishes=[]
  cardImage=[]
  sendquery;
  

  ngOnInit(): void {
    // this.recipeService.convertRecipe("https://www.foodnetwork.com/recipes/tyler-florence/spaghetti-alla-carbonara-recipe-1914140").subscribe(data => {
      
    // });
    
  }

  // getcardImageArr () {
  //   return this.cardImage
  // }
  getSearch () {
    return this.query
  }


  getCookbook(){
    var ingredients = []
    ingredients = this.cookbook.get(0)
    var i;
    //console.log(this.dishes[0].bookmarked)
    for(i=0; i<ingredients.length; i++){
      console.log("here")
      console.log(ingredients[i])
    }
  }


goToViewRecipies(){
  this.sendquery=this.query
  //console.log(this.sendquery)
  this.searchService.relaySearch(this.sendquery)
  this.router.navigate(["/viewrecipes",])
}

//  fetchRecipe(){
//   this.recipeService.getRecipe("https://api.edamam.com/search?q="+this.query+"&app_id=5c750a59&app_key=e3c27429d03353499abfe7f3fbb81f38&from=0&to=10&calories=591-722&health=alcohol-free").subscribe((data:any) => {
//     //url = data.hits[0].recipe.url;
//     this.dishes = data.hits
//     console.log(this.dishes)
//     console.log(this.dishes.length)
//     var x;
//     for(x=0; x<this.dishes.length;x++){
//       this.cardImage[x] = this.dishes[x].recipe.image
//     }
//     console.log(this.cardImage[0])
//     var i;
//     for(i=0; i<this.dishes.length-1;i++){
//       this.cookbook.set(i, this.dishes[i].recipe.ingredients)
//     }
//     console.log(data)
//   })
//   this.router.navigate(["/viewrecipes",])
// }

urlToRecipe(){
  var isCompleted=false;
  console.log("in here")
  this.recipeService.convertRecipe("https://www.foodnetwork.com/recipes/tyler-florence/spaghetti-alla-carbonara-recipe-1914140").then(data =>{
    console.log(data)
  })
  //   console.log(this.data)
   }
}

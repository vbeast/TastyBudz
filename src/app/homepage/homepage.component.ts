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

  sendquery;
 
  
  columnOne = ["Breakfast", "Lunch", "Dinner", "Dessert", "Smoothie"]
  underline = new Array(this.columnOne.length).fill('column-text')
  columnTwo = ["Italian", "Indian", "Chineese", "Medditeranian", "American"]
  underline2 = new Array(this.columnTwo.length).fill('column-text')
  columnThree = ["Pasta", "Fried Rice", "Chicken", "Steak", "Soups"]
  underline3 = new Array(this.columnThree.length).fill('column-text')
  
  ngOnInit(): void {
    
  }


  mouseOverUnderline(i, arr){
    if(arr == "columnOne"){
      this.underline[i] = 'column-text-underline'
    }
    if(arr == "columnTwo"){
      this.underline2[i] = 'column-text-underline'
    }
    if(arr == "columnThree"){
      this.underline3[i] = 'column-text-underline'
    }
  }

  mouseLeaveUnderline(i, arr){
    if(arr == "columnOne"){
      this.underline[i] = 'column-text'
    }
    if(arr == "columnTwo"){
      this.underline2[i] = 'column-text'
    }
    if(arr == "columnThree"){
      this.underline3[i] = 'column-text'
    }
  }

goToViewRecipies(hyperlink){
  if(hyperlink == null){
    this.searchService.relaySearch(this.sendquery)
    this.router.navigate(["/viewrecipes",])
  }
  else{
    this.searchService.relaySearch(hyperlink)
    this.router.navigate(["/viewrecipes",])
  }
  
}

}

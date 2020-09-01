import { Component, OnInit } from '@angular/core';
import {HomepageComponent} from 'src/app/homepage/homepage.component'
import { RecipeService } from '../services/recipe.service';
import { SearchinteractionService } from '../searchinteraction.service';
import {SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-viewrecipies',
  templateUrl: './viewrecipies.component.html',
  styleUrls: ['./viewrecipies.component.css']
})
export class ViewrecipiesComponent implements OnInit {
  cardImage=[]
  dishes=[]
  // cardImages = this.homepage.getcardImageArr()
  query;
  newsearch;
  firstload=true;

  constructor(private homepage:HomepageComponent, private recipeService:RecipeService, 
    private searchService: SearchinteractionService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
  //  var searchQuery = this.getSessionStorage("searchQuery") 
 
   
      this.searchService.homeSearch$.subscribe(
          data => {
            if(data !== ""){
              this.setSessionStorage(data)
            }
          }).unsubscribe()
          var searchQuery = this.getSessionStorage("searchQuery")
       
          this.fetchRecipe(searchQuery)
        
  }

  setSessionStorage(searchQuery){
    this.sessionStorage.store("searchQuery", searchQuery)
  }
  getSessionStorage(key){
    return this.sessionStorage.retrieve(key)
  }

  setQuery(query:any){
    this.query=query
    this.setSessionStorage(query)

  }
  print(){
    console.log(this.query)
  }

  fetchRecipe(searchRequest: any){
    this.recipeService.getRecipe("https://api.edamam.com/search?q="+searchRequest+"&app_id=5c750a59&app_key=e3c27429d03353499abfe7f3fbb81f38&from=0&to=10&calories=591-722&health=alcohol-free").subscribe((data:any) => {
      //url = data.hits[0].recipe.url;
      try {
        this.dishes = data.hits
      console.log(this.dishes)
      //console.log(this.dishes.length)
      var x;
      for(x=0; x<this.dishes.length;x++){
        this.cardImage[x] = this.dishes[x].recipe.image
      }
      } catch (error) {
        console.log("error occured:" + error)
      }
     
    })
      
    }
  }



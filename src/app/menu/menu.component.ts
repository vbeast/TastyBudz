import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  
  listItems = ["Calories", "Cook Time", "Ingredients"]
  isDisplay = new Array(this.listItems.length).fill(0)
  @Input () profPage: boolean = false;

  filterIngred: string = ""
  maxCal:string
  cookTime: string
  searchRecipe: string

  cookTimeOption = ["button", "button"]

  @Output() sendFilter: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
   if(this.profPage == true){
     this.listItems = []
   }
  }

  changeCookTimeClass(i, minutes, otherIndex){
    if(this.cookTimeOption[i] == "button"){
      this.cookTimeOption[i] = "button is-success"
      
      if(this.cookTimeOption[otherIndex] == this.cookTimeOption[i]){
        this.cookTimeOption[otherIndex] = "button"
        this.sendCookTime(minutes, true)
      }
      else{
        this.sendCookTime(minutes, false)
      }
    }
    else{
      this.cookTimeOption[i] = "button"
      this.sendCookTime(null, null)
    }
  }

  toggleDisplay(index){
    if(this.isDisplay[index] === 0){
      this.isDisplay[index] = 1
    }
     else{
      this.isDisplay[index] = 0

     }
  }

  sendCalories(){
    if(this.maxCal != ""){
      this.sendFilter.emit(["cals",this.maxCal])
    }
    this.maxCal = ""
  }
  sendCookTime(cookTime, revertFirst){
    if(cookTime != "" && revertFirst == false){
      this.sendFilter.emit(["cookTime",cookTime, false])
    }
    if(cookTime == null && revertFirst == null){
      this.sendFilter.emit(["cookTime",null, null])
    }
    else{
      this.sendFilter.emit(["cookTime", cookTime, true])
    }
    
  }

  sendIngred(){
    if(this.filterIngred != ""){
      this.sendFilter.emit(["ingred",this.filterIngred])
    }
    
    this.filterIngred =''
  }

  sendRecipe(){
    this.sendFilter.emit(["recipe", this.searchRecipe])
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  
  listItems = ["Calories", "Health", "Cook Time"]
  healthItems = ["Vegan", "Vegetarian", "Low-Sugar", "Penut-free", "Tree-nut-free"]
  isDisplay = new Array(this.listItems.length).fill(0)

  ngOnInit(): void {
   
  }

  toggleDisplay(index){
    if(this.isDisplay[index] === 0){
      this.isDisplay[index] = 1
    }
     else{
      this.isDisplay[index] = 0

     }    
  }

}

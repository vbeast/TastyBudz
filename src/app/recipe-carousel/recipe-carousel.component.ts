import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css']
})
export class RecipeCarouselComponent implements OnInit {

  imageRecipes = [
    ["https://www.bonappetit.com/recipe/pork-ragu-creamy-polenta", "../../assets/carousel1.jpg", "Pork Ragù over Creamy Polenta"],
    ["https://www.bonappetit.com/recipe/saucy-chicken-puttanesca", "../../assets/carousel2.jpg", "Saucy Chicken Puttanesca"],
    ["https://www.bonappetit.com/recipe/caramelized-cabbage", "../../assets/carousel3.jpg", "Fall-Apart Caramelized Cabbage"],
    ["https://www.bonappetit.com/recipe/chicken-tikka-masala", "../../assets/carousel4.jpg", "Chicken Tikka Masala"],
    ["https://www.bonappetit.com/recipe/french-ish-onion-soup", "../../assets/carousel5.jpg", "French-ish Onion Soup"],
    ["https://www.bonappetit.com/recipe/mac-n-cheese", "../../assets/carousel6.jpg", "BA’s Best Macaroni and Cheese"],
    ["https://www.bonappetit.com/recipe/ba-patty-melt", "../../assets/carousel7.jpg", "The BA Patty Melt"],
    ["https://www.bonappetit.com/recipe/argentinian-beef-empanadas", "../../assets/carousel8.jpg", "Argentinian Beef Empanadas"],
    ["https://www.bonappetit.com/recipe/oxtail-ragu-with-semolina-gnocchi", "../../assets/carousel9.jpg", "Oxtail Ragù with Semolina Gnocchi"],
    ["https://www.bonappetit.com/recipe/kimchi-braised-chicken-with-bacon", "../../assets/carousel10.jpg", "Kimchi-Braised Chicken with Bacon"]
  ]

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4, "infinite": false, "dots": true, "arrows": false, "autoplay": true, "autoplaySpeed": 7000};

  constructor() { }

  ngOnInit(): void {
  }

  navigate(url){
    window.open(url, "_blank");
  }

}

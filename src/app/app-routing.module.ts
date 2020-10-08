import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiginComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import {ViewrecipiesComponent} from './viewrecipies/viewrecipies.component'
import {MenuComponent} from './menu/menu.component'
import {ProfilepageComponent} from './profilepage/profilepage.component'
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component'
import {RecipeCarouselComponent} from './recipe-carousel/recipe-carousel.component'


const routes: Routes = [
  {path: "signin", component: SiginComponent},
  {path: "signup", component: SignupComponent},
  {path: "", component: HomepageComponent},
  {path: "viewrecipes", component: ViewrecipiesComponent},
  {path: "menu", component: MenuComponent},
  {path: "profilepage", component: ProfilepageComponent},
  {path: "loadingspinner", component: LoadingSpinnerComponent},
  {path: "recipecar", component: RecipeCarouselComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

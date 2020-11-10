import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiginComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import {ViewrecipiesComponent} from './viewrecipies/viewrecipies.component'
import {ProfilepageComponent} from './profilepage/profilepage.component'


const routes: Routes = [
  {path: "signin", component: SiginComponent},
  {path: "signup", component: SignupComponent},
  {path: "", component: HomepageComponent},
  {path: "viewrecipes", component: ViewrecipiesComponent},
  {path: "profilepage", component: ProfilepageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

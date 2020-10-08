import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipe(searchQuery){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("recipe/fetchRecipe",{searchQuery}, httpOptions)
   
  }
}



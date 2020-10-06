import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipe(searchQuery){
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("http://localhost:3000/recipe/fetchRecipe",{searchQuery}, httpOptions)
   
  }

  convertRecipe(url: string){
   // console.log('"' + url + '"')
    var bodyurl = '"' + url + '"'
    var b = "url"
   // console.log({url:url})
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post("http://localhost:3000/convertRecipe",{'url':url}, httpOptions).toPromise()
  }



}



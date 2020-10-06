import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  // slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 10000, "infinite": false}
  
  // italian = {cuisine:"Italian", pic: "../../assets/italian.jpg"}
  // indian = {cuisine:"Indian", pic: "../../assets/indian.jpg"}
  // american = {cuisine:"American", pic: "../../assets/american2.jpg"}
  // slides = [this.italian, this.indian, this.american]

  constructor() { }
  showNotif = false;
  notif = "notification is-success"
  notifExit = "notification is-success animate__animated animate__fadeOut animate__delay-2s"

  ngOnInit(): void {

    // this.showNotif = true
    
    
  }

  clearNotif(){
    this.showNotif = !this.showNotif;
    console.log(this.showNotif)
  }

  clickMe(){
    this.showNotif = !this.showNotif
    setTimeout(()=>{
      this.showNotif = !this.showNotif
    }, 3000)
  }

}

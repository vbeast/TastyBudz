import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }
  showNotif = false;
  notif = "notification is-success"
  notifExit = "notification is-success animate__animated animate__fadeOut animate__delay-2s"

  ngOnInit(): void {
    
    
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

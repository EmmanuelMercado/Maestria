import { Component,ElementRef, ViewChild } from '@angular/core';
import { DataLogin, UserData } from '../../interface/userData.interface';
import {ServiceService} from "../../service/service.service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public userData:DataLogin={
    user: "",
    password: ""
  }

  constructor(private userService : ServiceService){}

  loginUser():void{
    const {user, password} = this.userData

    if ( user && password){
      this.userService.login(this.userData)

    }
    else{
      console.log("Error");

    }
  }
}

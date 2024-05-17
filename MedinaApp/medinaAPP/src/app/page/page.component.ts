import { Component } from '@angular/core';
import {ServiceService} from "../service/service.service"
import { UserData } from '../interface/userData.interface';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {


  constructor(private userService : ServiceService ){

  }

  get isLogin():boolean{
    return this.userService.userIsLogin
  }

  get userInformation() : string{
    console.log(this.userService.userDataInformation);
    const name = this.userService.userDataInformation[0].name
    console.log({name});

    return name
  }
  // public userInformation : UserData = this.userService.userDataInformation

}

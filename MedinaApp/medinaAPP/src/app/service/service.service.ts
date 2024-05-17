import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from "@angular/common/http"


import { UserData, DataLogin, responseDataLogin } from '../interface/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public userData: UserData[] = []

  private dataLogin: DataLogin={
    user:"",
    password:""
  }

  private _userIsLogin: boolean = false

  private serviceURL: string = "http://localhost:3000/users/find"



  constructor(private http: HttpClient) { }


  get userDataInformation(){
    return this.userData
  }

  get userIsLogin(){
    return this._userIsLogin
  }

  public login(userInformation: DataLogin){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<responseDataLogin>(this.serviceURL, userInformation)
      .subscribe(
        (response) =>{
          if(response.status==="Ok"){

            this.userData.push(response.data)
            this.userDataInformation
            this._userIsLogin = true


          }
          else{
            alert("Credenciales incorrectas")
          }
        },
        (error) =>{
          console.log(error);

        }

      )


  }
}

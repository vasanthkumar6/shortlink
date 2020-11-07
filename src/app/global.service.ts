import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private hc:HttpClient) { }

  register(data):Observable<any>
  {
    console.log("service",data)
    return this.hc.post("/user/register",data)
  }
  activate(data):Observable<any>
  {
    console.log("activate",data)
    return this.hc.get(`/user/activateaccount/${data}`)
  }
  loginData(data):Observable<any>
  {
    console.log(data)
    return this.hc.post("/user/login",data)
  }
  forgotPwdEmail(data):Observable<any>
  {
    console.log("forgotpwd mail",data)
    return this.hc.post("/user/forgotpwdEmail",data)
  }
  forgotPwd(data):Observable<any>
  {
    console.log("forgotpwd",data)
    return this.hc.post("/user/forgotpassword",data)
  }
  sendUrl(data):Observable<any>
  {
    return this.hc.post("/shortener",data)
  }
  getUrl():Observable<any>
  {
    console.log("final")
    return this.hc.get("/user/x")
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router:Router, private gs:GlobalService ,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login(value)
  {
    if(value.email=="")
    {
      this.toastr.success("please enter Usernmae")
    }else if(value.password){
      this.toastr.success("please enter password")
    }
    else{
      this.gs.loginData(value).subscribe((data)=>{
        // alert(data["message"])
        if(data['message']=="Account doesn't existed")
        {
          this.toastr.success("Account doesn't existed")
        } 
        else if(data['message']=="invalid password")
        {
          this.toastr.success("invalid password")
        }
        else if(data['message']=="Login succesful..!"){
          this.router.navigate(["./dashboard"])
        }
        // this.router.navigate(['./dashboard'])
     })
    }
    }
    // console.log(value)
   
  RegisterPage()
  {
     this.router.navigate(['./register'])
  }

run()
{
  console.log("toastr")
  this.toastr.success("Account doesn't existed")
}  


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private gs:GlobalService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  registerData(value)
  {
    console.log("register ts",value)
     this.gs.register(value).subscribe((data)=>{
        if(data['message']=="User with this mail already exist")
          {
            this.toastr.success("User with this mail already exist")
          }
        else{
        if(data['message']=="verification link has sent to the Registerd Email")
          {
            this.toastr.success("verification link has sent to the Registerd Email")
          }
        }
     })
  }

  // activate()
  // {
  //   this.router.navigate(["/activate"])
  // }

}

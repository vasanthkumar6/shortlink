import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor( private gs:GlobalService,private toastr:ToastrService) { }

  ngOnInit(): void {
   
  }


  
  emailVerify(value){
    console.log(value)
    this.gs.forgotPwdEmail(value).subscribe((data)=>{
      this.toastr.success(data['message'])
    })

  }

  

}

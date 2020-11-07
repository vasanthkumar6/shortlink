import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {
  token:string;
  status:boolean=true
  password
  Retyped_password
  constructor(private gs:GlobalService, private ar:ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params)=>{
      this.token=params.get("token")
    
    })
  }

  // if(this.password==this.Retyped_password)
  // {
    
  // }
  // else{

  // }

  // }
  
  changepwd(value)
  {
    value.token=this.token
    console.log(value)
    this.gs.forgotPwd(value).subscribe((data)=>{
      this.toastr.success(data['message'])
      this.status=false
    })
  }
}

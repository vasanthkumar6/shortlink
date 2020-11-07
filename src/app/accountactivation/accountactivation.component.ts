import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-accountactivation',
  templateUrl: './accountactivation.component.html',
  styleUrls: ['./accountactivation.component.css']
})
export class AccountactivationComponent implements OnInit {
  id
  token
    constructor(private ar:ActivatedRoute, private gs:GlobalService ,private toastr:ToastrService) { }
  
    ngOnInit(): void {
      this.ar.paramMap.subscribe((params)=>{
      
        this.token=params.get("token")
        console.log("token",this.token)
      })
      
        this.gs.activate(this.token).subscribe((data)=>{
          this.toastr.success(data['message'])
        })
    }
  
  
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  output:[]=[]
  constructor(private toastr:ToastrService, private gs:GlobalService) { }

  ngOnInit() {
    // this.toastr.success("Login succesful..!")
    this.gs.getUrl().subscribe((data)=>{
      console.log("output",this.output)

       this.output=data['message']
    })
  }

  url(value)
  {
    this.gs.sendUrl(value).subscribe((data)=>{
      this.toastr.success(data['message'])
    })
  }

}

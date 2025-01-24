import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  public error=[];
  public form = {
    email : null,
    password : null,
    password_confirmation:null,
    resetToken :null
  }
  constructor(private route:ActivatedRoute,private router:Router,private dataService:DataService,private toastr:ToastrService,private ngzone:NgZone){
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
      console.log(params['token']);
      
    });
  }
  onSubmit(){
    this.dataService.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
    this.form.email = null
    this.form.password = null
    this.form.password_confirmation = null
   }
   handleResponse(data:any){
 
    this.toastr.success(data.data, '', {
      timeOut: 3000,
      progressBar: true,
    });
    this.ngzone.run(                                               
      ()=>(this.router.navigate(['/login']))) 
     
   }
 
   handleError(error:any){
     this.error = error.error.errors;
   }
  ngOnInit(): void {
    
  }

}

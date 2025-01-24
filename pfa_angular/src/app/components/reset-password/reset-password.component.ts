import { Component, NgZone, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  public form = {
    email: null
  };


  constructor(
    private dataService: DataService,
    private toastr:ToastrService,
    private router:Router,
    private ngzone:NgZone
  ) { }

  ngOnInit() {
    
  }


  onSubmit() {

    this.dataService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      (error:any) =>{ 
        console.log(error);
        
        this.toastr.error(error.error.error, 'Error', {
        timeOut: 3000,
        progressBar: false,
      })
    }

    );
    this.form.email = null
  }

  handleResponse(res:any) {
    this.toastr.success(res.data, '', {
      timeOut: 3000,
      progressBar: true,
    });
    this.ngzone.run(                                               
      ()=>(this.router.navigate(['/login'])))  

    console.log(res)
  }

}

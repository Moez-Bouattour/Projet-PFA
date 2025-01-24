import {Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  submitted=false;
  data:any;
  token:any;
  name:any;
  url:any;
  public form = {
    email:'',
    password:'',
    }
  loggedIn: boolean | undefined;
  public error = [];
 
  constructor(
    private router: Router,
    private dataService : DataService,
    private toastr:ToastrService,
    private route: ActivatedRoute,

  ) {
    console.log("=="+this.loggedIn);
  }
  
  ngOnInit(): void {
    /*this.form = this.formBuilder.group({
      email: ['',Validators.required,Validators.email],
      password: ['',Validators.required]
    });*/
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      
    });
    
  }
  Login(){
    return this.dataService.login(this.form).subscribe(
      // data=>console.log(data),
      data=>this.handleResponse(data),
       error=>this.handleError(error)
     );
  }

  handleResponse(data:any){
    console.log(data);
    // this.token.handle(data.access_token);
    this.dataService.changeAuthStatus(true);

  }

  handleError(error:any){
    this.error = error.error.error;
  }

  submit() {
   this.dataService.login(this.form).subscribe((res : any) =>
      {
        this.data=res;
        console.log(res);
        if(this.data.status===1)
        {
          this.token=this.data.data;
          console.log(this.token);
          
          localStorage.setItem('token',this.token);
          this.handleResponse(this.token);
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
          {
            timeOut : 2000,
            progressBar :true
          });
          
          if(this.form.email=== 'admin@admin.com')
          {
            this.router.navigate(['/admin']);
          }
          else{
            if (this.url==='/login')
            {
              this.router.navigate(['/client',this.form.email.split('@')[0]]);
            }
            else{
            this.route.queryParams.subscribe(params => {
              const id = params['id'];
              this.router.navigate(['/client',this.form.email.split('@')[0],'voiture',id,'reservation']);
            })
          
            }}
        }
        else if(res.status===0){
          this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
          {
            timeOut : 2000,
            progressBar :true
          });
        }

      });
      
          }
          
        }

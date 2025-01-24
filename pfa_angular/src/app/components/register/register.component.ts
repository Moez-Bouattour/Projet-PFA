import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,Validators,NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  public registrationForm: FormGroup;
  submitted=false;
  data:any;
  public error:any=[];
  public msg: any = null;
  selectedFile: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService : DataService,
    private toastr:ToastrService,
  ) {
    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      tel: [null, [Validators.required, Validators.pattern(/^\+216[0-9]{8}$/)]],
      ville: [null, Validators.required],
      CIN: [null, [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cpassword: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    
   
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
   
  console.log(this.selectedFile);
   
    
  }
  submitSignup(){
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.registrationForm.value.password !== this.registrationForm.value.cpassword) {
      this.toastr.error('Password and Confirm Password do not match.', 'Error', {
        timeOut: 2000,
        progressBar: false,
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('name', this.registrationForm.value.name);
    formData.append('tel', this.registrationForm.value.tel);
    formData.append('ville', this.registrationForm.value.ville);
    formData.append('CIN', this.registrationForm.value.CIN);
    formData.append('email', this.registrationForm.value.email);
    formData.append('password', this.registrationForm.value.password);
    
    
    return this.dataService.registerUser(formData).subscribe(
      
     // data=>console.log(data),
      data=>this.handleResponse(data),
      error=>this.handleError(error),
    );
  }

  handleResponse(data:any){
   if (data.statusCode === 200) {
    this.toastr.success(JSON.stringify(data.message), JSON.stringify(data.code),
    {
      timeOut : 2000,
      progressBar :true
    });
     this.msg = 'success';
    this.router.navigateByUrl("/login"); 
     }
     else{
      this.toastr.error(JSON.stringify(data.message), JSON.stringify(data.code),
      {
        timeOut : 2000,
        progressBar :false
      });
      this.msg = 'wrong';
    }
  }
  handleError(error:any){
    console.log(error);
    
   this.error = error.error.errors;
  }


}

import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';                                   
import jwt_decode from 'jwt-decode';                                  
import { DataService } from 'src/app/service/data.service'; 
import { Reclamation } from 'src/app/reclamation';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reclamation-admin',
  templateUrl: './reclamation-admin.component.html',
  styleUrls: ['./reclamation-admin.component.css']
})
export class ReclamationAdminComponent implements OnInit{
  token:any;
  userData:any;
  name:any;
  email:any;
  loggedIn:boolean = false; 
  reclamations:any;
  constructor(private dataService: DataService,private router:Router){}
  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.name=this.userData.name;
    this.getReclamations(); 
    
    }
    else{
      this.router.navigate(['/login']);
    }})}
    getReclamations()
    {
      this.dataService.getReclamations().subscribe(res => {
        this.reclamations = res;
      });
    }
  
}

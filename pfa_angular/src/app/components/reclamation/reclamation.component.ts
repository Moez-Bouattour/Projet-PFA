import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';                                   
import jwt_decode from 'jwt-decode';                                  
import { DataService } from 'src/app/service/data.service'; 
import { Reclamation } from 'src/app/reclamation';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit{
 
  token:any;
  userData:any;
  name:any;
  email:any;
  loggedIn:boolean = false; 
  reclamationForm: FormGroup;
  reclamation = {
    name:null,
    email: null,
    objet: null,
    description: null,
  };
  
  constructor(private dataService: DataService,private router:Router, private formBuilder: FormBuilder){}
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
  this.reclamation.name=this.name;
  this.email=this.userData.email;
  this.reclamation.email=this.email;
  
  
  }
  else{
    this.router.navigate(['/login']);
  }})}
  insertRec(){                                                                                       
    this.dataService.ajouterReclamation(this.reclamation).subscribe(res =>{   
      console.log(res);         
      this.router.navigate(['/client',this.email.split('@')[0]]);                                                                       
    })                                                            
} 








 


/*insertData() {
  this.dataService.insertReclamation(this.reclamation).subscribe(res => {
    console.log(res); 
  });
}*/
}

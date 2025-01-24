import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import{Router,ActivatedRoute} from '@angular/router'; 
import { Voiture } from 'src/app/voiture';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  constructor(private router:Router, private dataService:DataService,private route:ActivatedRoute) { }
  voitures : Voiture[];  
  token:any;
  userData:any;
  email:any;
  email1:any;                                                       
  id:any;                                                  
  loggedIn:boolean = false; 
        getVoitureData() {
          this.dataService.getData().subscribe(voitures => {
            this.voitures = voitures;
          });
        }

  ngOnInit(): void {    
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.getVoitureData();
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    
    this.email=this.userData.email;
    console.log(this.email);
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
    this.email1 = params.get('username');

    });
  }
  else{
    this.router.navigate(['/login']);
  }})}
  }



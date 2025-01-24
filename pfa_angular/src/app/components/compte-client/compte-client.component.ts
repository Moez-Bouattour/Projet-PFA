import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';                                    
import jwt_decode from 'jwt-decode';                                  
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/user'; 

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit{

  user : User; 
  token:any;
  userData:any;
  id:any;
  id1:any;
  loggedIn:boolean = false;
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router){};
  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.id=this.userData.user_id;
    this.route.params.subscribe((params) => {
      this.id1 = params['id']; // Extract the 'id' parameter from the route
      this.getUser();
    });
  }
  else{
    this.router.navigate(['/login'])
  }})}
    
  
  getUser() {
    this.dataService.getUser(this.id1).subscribe(res => {
      this.user = res;
      console.log(this.user);
    
    });

}

}
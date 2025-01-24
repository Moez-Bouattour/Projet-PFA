
import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  searchQuery:string='';
  url:any;
  token:any;
  userData:any;
  email:any;
  name:any;
  id:any;
  role:any;
  loggedIn:boolean = false;
  constructor(private router:Router, private dataService:DataService,private route:ActivatedRoute,private Token:TokenService){}
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
          this.id=this.userData.user_id;
          this.email=this.userData.email;
          this.role =this.userData.admin;
          this.router.events.subscribe(() => {
            this.url = this.router.url;
            console.log(this.url);
            
          });
          
        }
      }
    );
  }

  
    logout(event:MouseEvent){
      event.preventDefault();
      this.Token.remove();
      //console.log("Logout");
      this.loggedIn=false;
      this.dataService.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
  
    }
    search() {

      this.router.navigate(['/search'],{ queryParams: { search: this.searchQuery } }); // Redirige vers la page des résultats
      this.searchQuery=""
    }
    search1() {

      this.router.navigate(['/client',this.email,'search'],{ queryParams: { search: this.searchQuery } }); // Redirige vers la page des résultats
      this.searchQuery=""
    }
    search2() {

      this.router.navigate(['/admin',this.email,'search'],{ queryParams: { search: this.searchQuery } }); // Redirige vers la page des résultats
      this.searchQuery=""
    }


}
  


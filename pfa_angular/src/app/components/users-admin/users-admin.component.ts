import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import{ActivatedRoute, Router} from '@angular/router';                                    
import { User } from 'src/app/user'; 

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit{
  users:any;
  loggedIn:boolean = false;
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router){}
  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          { 
    this.getUsers();
  }
  else{
    this.router.navigate(['/login']);
  }})}
    
  getUsers() {
    this.dataService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    
    });

}
deleteUser(id:any)
{
  this.dataService.deleteUser(id).subscribe(res =>{  
    console.log(res);                               
  this.getUsers();                           
})
}

}

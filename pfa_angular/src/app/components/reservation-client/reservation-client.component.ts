import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';                                   
import { Voiture } from 'src/app/voiture'; 
import jwt_decode from 'jwt-decode';                                  
import { DataService } from 'src/app/service/data.service'; 
import { Reservation } from 'src/app/reservation';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent implements OnInit{
  reservations: any; 
  token:any;
  userData:any;
  id:any;
  email:any;
  res:any;
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
    this.email=this.userData.email;
    this.getReservations()}
    else{
      this.router.navigate(['/login']);
    }

  })}
  getReservations() {
    this.dataService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
}

deleteData(id:any){                                   
  console.log(id);                                  
this.dataService.deleteReservation(id).subscribe(res =>{  
    console.log(res);                               
  this.getReservations();                           
})                                                  
}

}

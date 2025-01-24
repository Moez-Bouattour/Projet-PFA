import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';                                   
import { Voiture } from 'src/app/voiture'; 
import jwt_decode from 'jwt-decode';                                  
import { DataService } from 'src/app/service/data.service'; 
import { Reservation } from 'src/app/reservation';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent implements OnInit{
  reservations: Reservation[]; 
  loggedIn:boolean = false; 
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router,private toastr:ToastrService){};
  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          { 
    this.getReservations();
  }
  else
  {
    this.router.navigate(['/login']);
  }})}
  getReservations() {
    this.dataService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

}
confirmReservation(id: number): void {
  this.dataService.confirmReservation(id,this.reservations)
    .subscribe(() => {
      const confirmedReservation = this.reservations.find(reservation => reservation.id === id);
      if (confirmedReservation) {
        confirmedReservation.status = 1;
        this.dataService.confirmReservation(id,this.reservations).subscribe(
          ()=>{
            this.toastr.success('Email envoyé avec succées','succées' ,{
              timeOut: 3000,
              progressBar: true,
            });
          }
        )
      }
    });
}
deleteData(id:any){                                   
  console.log(id);                                  
this.dataService.deletetReservation(id).subscribe(res =>{  
    console.log(res);                               
  this.getReservations();                           
})                                                  
}  
}

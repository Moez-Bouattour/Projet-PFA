import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/reservation';
import { DataService } from 'src/app/service/data.service';
import { Voiture } from 'src/app/voiture';
@Component({
  selector: 'app-edit-reservation-client',
  templateUrl: './edit-reservation-client.component.html',
  styleUrls: ['./edit-reservation-client.component.css']
})
export class EditReservationClientComponent implements OnInit{
  voitures : Voiture; 
  id:any;                                                                        
  data:any; 
  token:any;
  userData:any;
  email:any;                                                                     
  reservation=new Reservation();
  loggedIn:boolean = false; 
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router,private ngzone:NgZone,private toastr:ToastrService){}

  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.id = this.route.snapshot.params['id'];  
    this.getData();
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
   // this.id=this.userData.user_id;
    this.email=this.userData.email;
    
  }
  else{
    this.router.navigate(['/login']);
  }})}
  
  updateReservation(){                                                       
    this.dataService.updateReservation(this.id,this.reservation).subscribe(    
      res => {                                                         
        this.ngzone.run(                                               
            ()=>(this.router.navigate(['/client/',this.email.split('@')[0],'reservation'])))                                                          
      },
      (error:any)=>
      {
        if(error.code=422)
        {
        this.toastr.error('il faut entrer une date de location dépasse aujourdhui et la date de retour dépasse la date de location', 'Error', {
          timeOut: 2000,
          progressBar: false,
        });
      }
      else{
        this.toastr.error(error.message, 'Error', {
          timeOut: 2000,
          progressBar: false,
        });

      }  
    }                                                                
    )                                                                  
  }  
  getData(){                                                                     
    this.dataService.getReservationById(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                         
        this.reservation = this.data;                            
    }) 
    }  
    calculatePriceAndDays() {
      const dateL = new Date(this.reservation.dateL);
      const dateR = new Date(this.reservation.dateR);
      if (dateR <= dateL) {
        return ;
      }
      const timeDifference = dateR.getTime() - dateL.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
      const prixTotal = numberOfDays * this.reservation.voiture.prixJ;
    
      this.reservation.prix_total = prixTotal;
    }  

}

import { Component, NgZone, OnInit } from '@angular/core';
import{ActivatedRoute, Route, Router} from '@angular/router';                                   
import { Voiture } from 'src/app/voiture';                                       
import { DataService } from 'src/app/service/data.service'; 
import { Reservation } from 'src/app/reservation';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  id:any;                                                                       
  data:any;       
  voitures : Voiture;     
  username:any;  
  reservations: Reservation[];    
  token:any; 
  userData:any;
  reservation = new Reservation ()   
  loggedIn:boolean = false; 
  showTable: boolean = false;
  id1:any;  
  jour:any;                                                                            
  constructor(private route:ActivatedRoute,private dataService: DataService,private ngzone:NgZone,private router:Router,private toastr:ToastrService){};
  ngOnInit(): void {  
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.getReservations(); 
    console.log(this.route.snapshot.params['id'])                                    
    this.route.paramMap.subscribe(params => {
    this.username = params.get('username');
    this.id = params.get('id');
  });
  this.route.queryParams.subscribe(params => {
    this.id1 = params['id'];
    // Maintenant vous avez l'ID de la voiture ici pour votre utilisation
  });
  this.token=localStorage.getItem('token');
  this.userData=jwt_decode(this.token);
  this.reservation.user_id=this.userData.user_id;
  this.reservation.voiture_id=this.id;
    this.getData();  
     

  }
  else{
    this.router.navigate(['/login']);
  }})}
  getReservations() {
    this.dataService.getReservations().subscribe(reservations => {
      console.log(reservations);
      
      this.reservations = reservations;
    });
  }

  getData(){                                                                     
    this.dataService.getVoitureById(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                         
        this.voitures = this.data;                            
    }) 
    }
    insertData(){                         
                                                                           
      this.dataService.insertReservation(this.reservation).subscribe(res =>{  
        console.log(res); 
        this.ngzone.run(                                               
          ()=>(this.router.navigate(['/client/',this.username])))                                                            
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
  calculatePriceAndDays() {
    const dateL = new Date(this.reservation.dateL);
    const dateR = new Date(this.reservation.dateR);
    if (dateR <= dateL) {
      return;
    }
    const timeDifference = dateR.getTime() - dateL.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
    const prixTotal = numberOfDays * this.voitures.prixJ;
    this.jour=numberOfDays;
    this.reservation.prix_total = prixTotal.toFixed(1);
    setTimeout(() => {
      this.showTable = true;
    }, 0);
  }                                                                           
  }                                                                               


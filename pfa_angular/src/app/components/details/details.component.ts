import { Component, OnInit,NgZone } from '@angular/core';
import{ActivatedRoute,Router} from '@angular/router';                                   
import { Voiture } from 'src/app/voiture';                                       
import { DataService } from 'src/app/service/data.service'; 
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  id:any;                                                                        
  data:any;      
  username:any;                                                                
  voiture :Voiture; 
  email:any; 
  loggedIn:boolean = false;                                                       
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router){};
  ngOnInit(): void {      
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {                                      
    console.log(this.route.snapshot.params['id'])                                
   //this.id = this.route.snapshot.params['id']; 
   this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.id = params.get('id');
      // Les paramètres 'username' et 'id' sont maintenant disponibles pour utilisation dans ce composant.
      // Vous pouvez effectuer les actions souhaitées avec ces paramètres récupérés.
    });
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
    this.email = params.get('username');

    });
                                  
    this.getData();    
  }
    else{
      this.router.navigate(['/login']);
    }})

      }
      


                                                                                
  getData(){                                                                     
    this.dataService.getVoitureById(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                         
        this.voiture = this.data;                            
    }) 
    } 
    navigateToLogin() {
      this.dataService.authStatus.subscribe(
        value=>{
          this.loggedIn = value;
          console.log(this.loggedIn);
        }
      );
      if(this.loggedIn){
      this.route.queryParams.subscribe(params => {
        const id =this.route.snapshot.params['id']; // Access the 'id' parameter from the URL
        this.router.navigate([`/voiture/${id}/reservation`]);
      });
    }
    else if(!this.loggedIn){
      /*this.route.queryParams.subscribe(params => {
      const id = this.route.snapshot.params['id'];*/
      this.router.navigate(['login']);
    };
  }                                                                                                                                             
} 



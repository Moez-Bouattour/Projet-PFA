import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Router} from '@angular/router';                                   
import { Voiture } from 'src/app/voiture';                                       
import { DataService } from 'src/app/service/data.service'; 
@Component({
  selector: 'app-details-voiture-acceuil',
  templateUrl: './details-voiture-acceuil.component.html',
  styleUrls: ['./details-voiture-acceuil.component.css']
})
export class DetailsVoitureAcceuilComponent implements OnInit{

  id:any;                                                                        
  data:any;      
  username:any;                                                                
  voiture :Voiture; 
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      this.id = params.get('id');
    });
    this.getData();  
    
  }
  getData(){                                                                     
    this.dataService.getVoitureById(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                         
        this.voiture = this.data;                            
    }) 
    } 

    onReserveClick(id: any) {
      this.router.navigate(['/login'], { queryParams: { id: id } });
    }

}

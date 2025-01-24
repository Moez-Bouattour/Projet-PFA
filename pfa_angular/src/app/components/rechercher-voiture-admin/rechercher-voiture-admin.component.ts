import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DataService } from 'src/app/service/data.service';
import { Voiture } from 'src/app/voiture';
@Component({
  selector: 'app-rechercher-voiture-admin',
  templateUrl: './rechercher-voiture-admin.component.html',
  styleUrls: ['./rechercher-voiture-admin.component.css']
})
export class RechercherVoitureAdminComponent  implements OnInit{
  voitures: Voiture[]=[];
  token:any;
  userData:any;
  email:any;
  constructor( private route: ActivatedRoute,private dataService:DataService){}
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchVoitures(searchQuery);
      }
    });
    
  }
  searchVoitures(searchQuery: string) {
    this.dataService.searchVoitures(searchQuery)
      .subscribe((data:any) => {
        this.voitures = data;

        
      });
  }


  deleteData(id:any){                                   
    console.log(id);                                  
  this.dataService.deletetVoiture(id).subscribe(res =>{  
      console.log(res);                               
    this.getVoitureData();                           
  })                                                  
}  
getVoitureData() {
  this.dataService.getData().subscribe((res:any) => {
    console.log(res);
    this.voitures = res; 
  });
}
}

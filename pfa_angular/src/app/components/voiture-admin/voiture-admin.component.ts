import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import{Router} from '@angular/router'; 
import { Voiture } from 'src/app/voiture';

@Component({
  selector: 'app-voiture-admin',
  templateUrl: './voiture-admin.component.html',
  styleUrls: ['./voiture-admin.component.css']
})
export class VoitureAdminComponent implements OnInit{
  voitures : Voiture[]; 

  constructor(private dataService:DataService){
  }
 ngOnInit(): void {
  this.getVoitureData();
   
 }
 getVoitureData() {
  this.dataService.getData().subscribe(voitures => {
    this.voitures = voitures;
  });
}

}

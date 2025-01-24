import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import{Router} from '@angular/router'; 
import { Voiture } from 'src/app/voiture';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit{
  constructor(private dataService:DataService,private router:Router,private http:HttpClient) { }
  reclamations:any;
  voitures : Voiture[];                                                         
  id:any;  
  searchQuery: string = '';                                           
  
        getVoitureData() {
          this.dataService.getData().subscribe(voitures => {
            this.voitures = voitures;
          });
        }
                                                
ngOnInit(): void {                                         
      this.getVoitureData(); 
      this.getReclamations();                              
    }
    getReclamations()
    {
      this.dataService.getReclamations().subscribe(res => {
        this.reclamations = res;
      });
    }
      /*this.http.get<any[]>('http://127.0.0.1:8000/api/search', { params: { search: this.searchQuery } })
        .subscribe(data => {
          this.voitures = data;
        });*/

    }



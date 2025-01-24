import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Voiture } from 'src/app/voiture';

@Component({
  selector: 'app-search-voiture',
  templateUrl: './search-voiture.component.html',
  styleUrls: ['./search-voiture.component.css']
})
export class SearchVoitureComponent implements OnInit{
  voitures: Voiture[]=[];
  constructor(private http:HttpClient, private route: ActivatedRoute,private dataService:DataService ){
  }
  ngOnInit(): void {
    
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


}

// Importations des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeleVoiture } from 'src/app/modele-voiture';
import { DataService } from 'src/app/service/data.service';
import { Ville } from 'src/app/ville';
import { Voiture } from 'src/app/voiture';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loggedIn:boolean = false; 
  voitures: any; 
  car: Voiture = new Voiture(); // Instance of Voiture class
  cities: Ville[];
  selectedFile: File
  constructor(private dataService: DataService,private router:Router) {
  
  }
  

  ngOnInit(): void {
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {
    this.getVoitureData(); 
  }
  else{
    this.router.navigate(['/login']);
  }
})}

  // Méthode pour récupérer les données des voitures depuis le service
  getVoitureData() {
    this.dataService.getData().subscribe((res:any) => {
      console.log(res);
      this.voitures = res; 
    });
  }

  insertData() {
    const formData = new FormData();
    formData.append('Annee', this.car.Annee);
    formData.append('Disponibilite', this.car.Disponibilite);
    formData.append('Immatricule', this.car.Immatricule);
    formData.append('prixJ', this.car.prixJ.toString());
    formData.append('image', this.car.image);
    formData.append('type', this.car.type);
    formData.append('Kilometrage', this.car.Kilometrage.toString());
    formData.append('modele[nomModele]', this.car.modele.nomModele);
    formData.append('modele[marque]', this.car.modele.marque);
    formData.append('ville[nomVille]', this.car.ville.nomVille);
    formData.append('ville[codePostal]', this.car.ville.codePostal);
    this.dataService.insertVoiture(formData).subscribe(res => {
      console.log(res);
      this.getVoitureData(); 
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.car.image=this.selectedFile;
    console.log(this.selectedFile);
    
  }
  deleteData(id:any){                                   
    console.log(id);                                  
  this.dataService.deletetVoiture(id).subscribe(res =>{  
      console.log(res);                               
    this.getVoitureData();                           
  })                                                  
}  

}

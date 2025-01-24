import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ Router} from '@angular/router';                                                                     
import { DataService } from 'src/app/service/data.service'; 
@Component({
  selector: 'app-reclamation-acceuil',
  templateUrl: './reclamation-acceuil.component.html',
  styleUrls: ['./reclamation-acceuil.component.css']
})
export class ReclamationAcceuilComponent implements OnInit{
  public reclamationForm: FormGroup;
  submitted=false;
  constructor(private dataService: DataService,private router:Router, private formBuilder: FormBuilder){
    this.reclamationForm =  this.formBuilder.group({
      name: [null, Validators.required],
      description: [null,Validators.required],
      objet: [null],
      email: [null, [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    
  }
  insertRec(){   
    this.submitted = true;
    if (this.reclamationForm.invalid) {
      return;
    }                  
    const formData = new FormData();
    formData.append('name', this.reclamationForm.value.name);
    formData.append('email', this.reclamationForm.value.email);
    formData.append('objet', this.reclamationForm.value.objet);
    formData.append('description', this.reclamationForm.value.description);                                                                  
    this.dataService.ajouterReclamation(formData).subscribe(res =>{     

      this.router.navigate(['/']);                                                                       
    })   
}}

import { Component ,OnInit,NgZone} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Voiture } from 'src/app/voiture';
import{ActivatedRoute,Router} from '@angular/router'; 
@Component({
  selector: 'app-edit-voiture',
  templateUrl: './edit-voiture.component.html',
  styleUrls: ['./edit-voiture.component.css']
})
export class EditVoitureComponent implements OnInit{                             
  id:any;                                                                        
  data:any;                                                                      
  voiture:Voiture=new Voiture();
  loggedIn:boolean = false;  
  imageFile:File;                                                 
  constructor(private route:ActivatedRoute,private dataService: DataService,private router:Router,private ngzone:NgZone){};                    
                                                                                
  ngOnInit(): void {                    
    this.dataService.authStatus.subscribe(
      value=>{
        this.loggedIn = value;
        console.log(this.loggedIn);
        if(this.loggedIn)
          {                                         
    console.log(this.route.snapshot.params['id'])                                
    this.id = this.route.snapshot.params['id'];                                  
    this.getData();                                                              
  }                        
  else{
    this.router.navigate(['/login']);
  }})}  
  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.voiture.image=fileInput.files[0].name;
    }
    
    }
                                                  
  getData(){                                                                     
    this.dataService.getVoitureById(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                       
        this.voiture = this.data;                            
    }) 
    }  
    updateVoiture(){
      this.voiture.image=this.voiture.image.replace("/storage/", "");
      this.dataService.updateVoiture(this.id,this.voiture).subscribe(    
        res => {                                                         
          this.ngzone.run(                                               
              ()=>(this.router.navigateByUrl('admin')))                                                          
        }                                                                
      )                                                                  
    }                                                                    
}                                      

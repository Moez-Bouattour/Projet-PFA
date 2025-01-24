import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup , Validators,FormBuilder} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/user';
@Component({
  selector: 'app-edit-password-client',
  templateUrl: './edit-password-client.component.html',
  styleUrls: ['./edit-password-client.component.css']
})
export class EditPasswordClientComponent  implements OnInit{
  id:any;                                                                        
  data:any;                                                                      
  user=new User(); 
  loggedIn:boolean = false;
  constructor(private toastr:ToastrService, private route:ActivatedRoute,private dataService: DataService,private router:Router,private ngzone:NgZone,private formBuilder: FormBuilder){};                    
                                                                                
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
  }                                  
})}                                         
  getData(){                                                                     
    this.dataService.getUser(this.id).subscribe(                           
      res => {                                                                   
        console.log(res);                                                        
        this.data = res;                                                         
        this.user = this.data;                            
    }) 
    }  
    updatePass(){      
      if (!this.user.current_password || !this.user.new_password) {
        this.toastr.error('Please fill both current password and new password fields.', 'Error', {
          timeOut: 2000,
          progressBar: false,
        });
        return;
      }    
            

      this.dataService.updatePass(this.id, this.user).subscribe(    
        res => {        
          this.toastr.success('Password user updated successfully','succeess', {
            timeOut: 2000,
            progressBar: true,
          });                                                
         console.log(res);
         this.ngzone.run(                                               
          ()=>(this.router.navigate(['/client/',this.user.email.split('@')[0],'compte',this.id])))          
                                                                  
        },
        error=>{
          this.toastr.error('current Password incorrect', 'Error', {
            timeOut: 2000,
            progressBar: false,
          });
         
          
        }                                                                
      )                                                                  
    }             

}


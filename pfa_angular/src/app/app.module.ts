import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoituresComponent } from './components/voitures/voitures.component';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailsComponent } from './components/details/details.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { registerLocaleData } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { ReservationClientComponent } from './components/reservation-client/reservation-client.component';
import { CompteClientComponent } from './components/compte-client/compte-client.component';
import { EditVoitureComponent } from './components/edit-voiture/edit-voiture.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { ReservationAdminComponent } from './components/reservation-admin/reservation-admin.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { EditCompteClientComponent } from './components/edit-compte-client/edit-compte-client.component';
import { EditReservationClientComponent } from './components/edit-reservation-client/edit-reservation-client.component';
import { SearchVoitureComponent } from './components/search-voiture/search-voiture.component';
import { RechercherVoitureClientComponent } from './components/rechercher-voiture-client/rechercher-voiture-client.component';
import { EditPasswordClientComponent } from './components/edit-password-client/edit-password-client.component';
import { RechercherVoitureAdminComponent } from './components/rechercher-voiture-admin/rechercher-voiture-admin.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DetailsVoitureAcceuilComponent } from './components/details-voiture-acceuil/details-voiture-acceuil.component';
import { ReclamationAdminComponent } from './components/reclamation-admin/reclamation-admin.component';
import { ReclamationAcceuilComponent } from './components/reclamation-acceuil/reclamation-acceuil.component';

const appRoutes: Routes =
[                            
  {                                                    
    path:'', component:VoituresComponent              
  },  
  {                                                    
    path:'client/:username/voiture/:id', component:DetailsComponent 
  },
  {
    path:'search', component:SearchVoitureComponent
  },
  {                                                    
    path:'client/:username/voiture/:id/reservation', component:ReservationComponent 
  },
  {                                                    
    path:'voiture/:id', component:DetailsVoitureAcceuilComponent 
  },
  {                                                    
    path:'login', component:LoginComponent 
  },
  {                                                    
    path:'reclamation', component:ReclamationAcceuilComponent 
  },
  {                                                    
    path:'admin/reclamations', component:ReclamationAdminComponent 
  },
  {                                                    
    path:'resetPassword', component:ResetPasswordComponent 
  },
  {                                                    
    path:'changePassword', component:ChangePasswordComponent 
  },
  {                                                    
    path:'register', component:RegisterComponent 
  },
  {                                                    
    path:'admin', component:AdminComponent 
  },
  {                                                    
    path:'admin/voiture/:id', component:EditVoitureComponent 
  },
  {                                                    
    path:'client/:username', component:ClientComponent 
  },
  {                                                    
    path:'client/:username/search', component:RechercherVoitureClientComponent 
  },
  {                                                    
    path:'admin/:username/search', component:RechercherVoitureAdminComponent 
  },
  {                                                    
    path:'client/:username/reservation', component:ReservationClientComponent 
  },
  {                                                    
    path:'client/:username/reservation/:id/edit', component:EditReservationClientComponent 
  },
  {                                                    
    path:'client/:username/reclamation', component:ReclamationComponent 
  },
  {                                                    
    path:'client/:username/compte/:id', component:CompteClientComponent 
  },
  {                                                    
    path:'client/:username/compte/:id/edit', component:EditCompteClientComponent 
  },
  {                                                    
    path:'client/:username/compte/:id/editPassword', component:EditPasswordClientComponent 
  },
  {                                                    
    path:'admin/users', component:UsersAdminComponent 
  },
  {
                                                        
    path:'admin/reservations', component:ReservationAdminComponent 
  },


]
@NgModule({
  declarations: [
    AppComponent,
    VoituresComponent,
    NavbarComponent,
    DetailsComponent,
    ReservationComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ClientComponent,
    ReservationClientComponent,
    CompteClientComponent,
    EditVoitureComponent,
    UsersAdminComponent,
    ReservationAdminComponent,
    ReclamationComponent,
    EditCompteClientComponent,
    EditReservationClientComponent,
    SearchVoitureComponent,
    RechercherVoitureClientComponent,
    EditPasswordClientComponent,
    RechercherVoitureAdminComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    DetailsVoitureAcceuilComponent,
    ReclamationAdminComponent,
    ReclamationAcceuilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,   
    BrowserAnimationsModule,   
    ToastrModule.forRoot(),                           
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

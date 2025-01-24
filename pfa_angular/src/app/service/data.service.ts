import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Voiture } from '../voiture';
import { Reservation } from '../reservation';
import { Register } from '../register';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { VoitureAdmin } from '../voiture-admin';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:8000';
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  searchVoitures(searchQuery: string) {
    return this.httpClient.get<any[]>(`${this.baseUrl}/api/search?search=${searchQuery}`);
  }

  constructor(private httpClient: HttpClient,private token: TokenService) { }
  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }

  getData(): Observable<Voiture[]>{                                                            
    return this.httpClient.get<Voiture[]>('http://127.0.0.1:8000/api/voitures'); 
  } 
  getVoitureById(id:any): Observable<Voiture>{                                                   
    return this.httpClient.get<Voiture>('http://127.0.0.1:8000/api/voiture/'+id); 
  }
  /*getDataR()
  {
    return this.httpClient.get('http://127.0.0.1:8000/api/reservation');
  }*/
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>('http://127.0.0.1:8000/api/reservation');
  }
  getReservationById(id:any){                                                   
    return this.httpClient.get('http://127.0.0.1:8000/api/reservation/'+id); 
  }
  confirmReservation(id: any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/confirmReservation/'+id,data);
  }
  deletetReservation(id:any){                                                             
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteReservation/'+id);
  }
  insertData(data:Reservation){                                                      
    return this.httpClient.post('http://127.0.0.1:8000/api/addReservation',data);  
  }
  registerUser(data:any)
  {
    return this.httpClient.post('http://127.0.0.1:8000/api/register',data);
  } 
  login(data:any)
  {
    return this.httpClient.post('http://127.0.0.1:8000/api/login',data);
  }
  getUser(id:any)
  {
    const url = `${this.baseUrl}/api/user/${id}`;
    return this.httpClient.get<User>(url);
  } 
  getUsers()
  {
    return this.httpClient.get('http://127.0.0.1:8000/api/users');
  }
  insertVoiture(data:any){                                                      
    return this.httpClient.post('http://127.0.0.1:8000/api/addVoiture',data);  
  }        
  deletetVoiture(id:any){                                                             
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteVoiture/'+id);
  }
  updateVoiture(id:any,data:any){                                                 
    return this.httpClient.put('http://127.0.0.1:8000/api/updateVoiture/'+id,data); 
  } 
  ajouterReclamation(data:any)
  {
    return this.httpClient.post('http://127.0.0.1:8000/api/ajouterReclamation',data);
  }
  insertReservation(data:any)
  {
    return this.httpClient.post('http://127.0.0.1:8000/api/addReservation',data);
  }
  deleteReservation(id:any){                                                             
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteReservation/'+id);
  }
  deleteUser(id:any){                                                             
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteUser/'+id);
  }
  updateReservation(id:any,data:Reservation){                                                 
    return this.httpClient.put('http://127.0.0.1:8000/api/updateReservation/'+id,data); 
  } 
  sendPasswordResetLink(data:any) {
    return this.httpClient.post(`${this.baseUrl}/api/sendPasswordResetLink`, data)
  }
  
  changePassword(data:any) {
    return this.httpClient.post(`${this.baseUrl}/api/resetPassword`, data)
  }
  updateUser(id:any,data: User)
  {

    return this.httpClient.put('http://127.0.0.1:8000/api/updateUser/'+id,data); 
  }
  updatePass(id:any,data: User)
  {

    return this.httpClient.put('http://127.0.0.1:8000/api/updatePass/'+id,data); 
  }
  getVilles() {
    return this.httpClient.get('http://127.0.0.1:8000/api/villes');
  }
  getReclamations() {
    return this.httpClient.get('http://127.0.0.1:8000/api/getReclamation');
  }


} 



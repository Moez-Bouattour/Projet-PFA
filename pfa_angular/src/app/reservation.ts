import { User } from "./user";
import { Voiture } from "./voiture";

export class Reservation {
    id:any;
    user_id:any;         
    voiture_id:any;     
    dateL:any;       
    dateR:any;
    prix_total:any;
    user:User;
    voiture:Voiture;
    status:any;
}


import { ModeleVoiture } from "./modele-voiture";
import { Ville } from "./ville";
export class Voiture {
    id: any;
    Annee: any;
    Disponibilite: any;
    prixJ: any;
    Kilometrage: any;
    Immatricule: any;
    image: any;
    modele: ModeleVoiture=new ModeleVoiture();
    ville: Ville= new Ville() 
    type: any;
    constructor() {
  
    }

    
  }
  

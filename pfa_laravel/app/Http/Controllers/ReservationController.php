<?php

namespace App\Http\Controllers;
use App\Models\Voiture;
use App\Models\reservation;
use App\Models\Ville;
use App\Models\modeleVoiture;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use App\Jobs\CheckReservationStatus;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmation;
class ReservationController extends Controller
{
    public function addReservation(Request $request)
    {                                 
        $data = $request->validate([
            'user_id' => 'required',
            'voiture_id' => 'required',
            'dateL' => 'required|after_or_equal:today',
            'dateR' => 'required|date|after:dateL',
            'prix_total'=>'required|numeric' 
        ]);
    
        $dateL = Carbon::parse($data['dateL']);
        $dateR = Carbon::parse($data['dateR']);
    
        if ($dateR <= now()) {
            return response()->json(['error' => 'La date de retour est déjà passée.'], 400);
        }
        $reservation = reservation::create($data);                      
        return response($reservation,201);                                        
    }

    public function index() 
{
    $reservations = reservation::with('user', 'voiture.modele')->get();

    return response()->json($reservations);
}
public function updateReservation(Request $request, $id){                     
    $res = reservation::find($id);                                            
    if(is_null($res)){                                                    
        return response()->json(['message' => 'Reservation introuvable'],404);    
    } 
    $data = $request->validate([
        'user_id' => 'required',
        'voiture_id' => 'required',
        'dateL' => 'required|after_or_equal:today',
        'dateR' => 'required|date|after:dateL',
        'prix_total'=>'required|numeric' // Validate that dateR comes after dateL
    ]);
    $dateL = Carbon::parse($data['dateL']);
    $dateR = Carbon::parse($data['dateR']);
    
    if ($dateR <= now()) {
        return response()->json(['error' => 'La date de retour est déjà passée.'], 400);
    }
    
    // Mettre à jour les informations de réservation
    $res->update($data);                                                                        
                                           
    return response($res,200);                                            
    }   
    public function deleteReservation(Request $request, $id){                  
        $res = reservation::find($id);                                         
        if(is_null($res)){                                                 
            return response()->json(['message' => 'Reservation introuvable'],404); 
        }                                                                      
        $res->delete();    
        $voiture = $res->voiture;
        $voiture->disponibilite = 1;
        $voiture->save();                                                 
        return response(null,204);                                             
        }  
        public function getReservationById($id){
            $res = reservation::with('voiture')->find($id);                                         
                                                  
            if(is_null($res)){                                                
                return response()->json(['message' => 'Reservation introuvable'],404);
            }                                                                     
            return response()->json($res,200);                      
        }

        public function confirmReservation($id)
        {
            $reservation = Reservation::with('User')->find($id);
            $email=$reservation->user->email;
            $voiture = $reservation->voiture;
            $voiture->disponibilite = 0;
            $voiture->save();  
            $reservation->status = 1;
            $reservation->save();
            Mail::to($email)->send(new ReservationConfirmation($reservation));
            return response()->json(['message' => 'Réservation confirmée avec succès et e-mail envoyé'], 200);
        }
    
}



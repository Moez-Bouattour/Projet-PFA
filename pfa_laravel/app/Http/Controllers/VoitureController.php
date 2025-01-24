<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Models\Ville;
use App\Models\modeleVoiture;
use Illuminate\Support\Facades\Storage;
class VoitureController extends Controller
{
    public function getVoiture()
    {                       
        $voiture = Voiture::with('ville', 'Modele')->get();

        return response()->json($voiture);
    } 


    public function getVoitureById($id)
    {                                         
        $voiture = Voiture::with('Ville', 'Modele')->find($id);

    if (!$voiture) {
        return response()->json(['message' => 'Réservation non trouvée'], 404);
    }

    return response()->json($voiture);                      
    }

    public function addVoiture(Request $request)
    {   
        $modele = modeleVoiture::firstOrCreate(
            ['nomModele' => $request->modele['nomModele']],
            ['marque' => $request->modele['marque']]
        );
    
        // Create or retrieve the ville instance and associate it with the voiture
        $ville = Ville::firstOrCreate(
            ['nomVille' => $request->ville['nomVille']],
            ['codePostal' => $request->ville['codePostal']]
        );
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public'); // You can change 'public/images' to your desired storage path
            $image = basename($imagePath);
            $imageUrl = Storage::url($imagePath);
        }
        $voiture = Voiture::create([
            'Annee' => $request->Annee,
            'Disponibilite' => $request->Disponibilite,
            'Immatricule' => $request->Immatricule,
            'prixJ' => $request->prixJ,
            'image' =>  $imageUrl,
            'type' => $request->type,
            'Kilometrage' => $request->Kilometrage,
            'id_modele' => $modele->id,
            'id_ville' => $ville->id,
        ]);

    return response()->json($voiture, 201);
}
public function searchVoiture(Request $request)
{
    $search = $request->input('search');
    
    $voitures = Voiture::with(['ville', 'modele' => function ($query) use ($search) {
        $query->where('nomModele', 'LIKE', '%' . $search . '%')
              ->orWhere('marque', 'LIKE', '%' . $search . '%');
    }]) ->whereHas('modele', function ($query) use ($search) {
        $query->where('nomModele', 'LIKE', '%' . $search . '%')
              ->orWhere('marque', 'LIKE', '%' . $search . '%');
    })->get();
   
   

    return response()->json($voitures);
}

    

    public function updateVoiture(Request $request, $id)
{
    $voiture = Voiture::find($id); // Récupérer la voiture existante

    // Mise à jour des champs de la voiture
    $voiture->Annee = $request->Annee;
    $voiture->Disponibilite = $request->Disponibilite;
    $voiture->Immatricule = $request->Immatricule;
    $voiture->prixJ = $request->prixJ;
    $voiture->type = $request->type;
    $voiture->Kilometrage = $request->Kilometrage;

    // Mise à jour du modèle de voiture si nécessaire
    $modele = modeleVoiture::firstOrCreate(
        ['nomModele' => $request->modele['nomModele']],
        ['marque' => $request->modele['marque']]
    );
    $voiture->id_modele = $modele->id;

    // Mise à jour de la ville si nécessaire
    $ville = Ville::firstOrCreate(
        ['nomVille' => $request->ville['nomVille']],
        ['codePostal' => $request->ville['codePostal']]
    );
    $voiture->id_ville = $ville->id;

    // Mise à jour de l'image si un nouveau fichier est téléchargé
 
    if ($request->filled('image')){
        $imagePath = $request->input('image');
        $image = basename($imagePath);
        $imageUrl = Storage::url($imagePath);
        $voiture->image = $imageUrl;}
        else{
        $voiture->image = $voiture->image;
        }
    

    $voiture->save(); // Enregistrer les modifications

    return response()->json($voiture, 200);
}
        
        public function deleteVoiture(Request $request, $id){                  
            $voiture = Voiture::find($id);                                         
            if(is_null($voiture)){                                                 
                return response()->json(['message' => 'Voiture introuvable'],404); 
            }                                                                      
            $voiture->delete();                                                    
            return response(null,204);                                             
            } 



}

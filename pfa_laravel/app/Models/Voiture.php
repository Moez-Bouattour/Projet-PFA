<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }
    public function ville()
    {
        return $this->belongsTo(Ville::class, 'id_ville');
    }
    public function modele()
{
    return $this->belongsTo(modeleVoiture::class, 'id_modele');
}
    use HasFactory;
    protected $fillable = ['Annee','Disponibilite','Immatricule','prixJ','image','id_ville','id_modele','type','Kilometrage'];
    public static function findOrCreateModele($modeleData)
    {
        $modele = ModeleVoiture::where([
            'nomModele' => $modeleData['nomModele'],
            'marque' => $modeleData['marque'],
        ])->first();

        if (!$modele) {
            $modele = ModeleVoiture::create($modeleData);
        }

        return $modele->id;
    }
    public static function findOrCreateVille($villeData)
    {
        $ville = Ville::where([
            'nomVille' => $villeData['nomVille'],
            'codePostal' => $villeData['codePostal'],
        ])->first();

        if (!$ville) {
            $ville = Ville::create($villeData);
        }

        return $ville->id;
    }

}

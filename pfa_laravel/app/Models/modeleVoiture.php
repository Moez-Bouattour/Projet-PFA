<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class modeleVoiture extends Model
{
    use HasFactory;
    protected $fillable = ['nomModele','marque'];
    public function voiture()
    {
        return $this->hasMany(Voiture::class);
    }
}

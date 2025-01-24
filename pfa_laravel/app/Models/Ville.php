<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;
    protected $fillable = ['nomVille','codePostal'];
    public function voiture()
    {
        return $this->hasMany(Voiture::class);
    }
    
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation extends Model
{
    use HasFactory;
    protected $fillable = ['id','user_id','voiture_id','dateL','dateR','prix_total'];
    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

public function voiture()
{
    return $this->belongsTo(Voiture::class, 'voiture_id');
}
    
}


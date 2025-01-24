<?php

namespace App\Http\Controllers;

use App\Models\reclamation;
use App\Http\Requests\StorereclamationRequest;
use App\Http\Requests\UpdatereclamationRequest;
use Illuminate\Http\Request;

class ReclamationController extends Controller
{
    public function addReclamation(Request $request){                                 
        $reclamation = reclamation::create($request->all());                          
        return response($reclamation,201);                                        
 }
 public function getReclamations()
{
    $reclamations = reclamation::all();

    foreach ($reclamations as $reclamation) {
        $reclamation->time_passed = $reclamation->created_at->diffForHumans(); // Calcul du temps passé
    }

    return response()->json($reclamations); 
}
}
<?php

namespace App\Http\Controllers;

use App\Models\modeleVoiture;
use App\Http\Requests\StoremodeleVoitureRequest;
use App\Http\Requests\UpdatemodeleVoitureRequest;

class ModeleVoitureController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'nomModele' => 'required',
            'marque' => 'required',
        ]);

        // Create the new model with the given data
        $modele = modeleVoiture::create($validatedData);

        return response()->json(['message' => 'Model created successfully', 'data' => $modele]);
    }
}

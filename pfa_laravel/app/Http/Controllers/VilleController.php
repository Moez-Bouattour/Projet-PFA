<?php

namespace App\Http\Controllers;

use App\Models\Ville;
use App\Http\Requests\StoreVilleRequest;
use App\Http\Requests\UpdateVilleRequest;

class VilleController extends Controller
{
    public function getVilles()
    {
        $cities = Ville::all();
        return response()->json(['cities' => $cities], 200);
    }
}

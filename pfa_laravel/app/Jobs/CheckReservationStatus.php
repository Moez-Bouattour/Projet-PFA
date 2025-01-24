<?php

namespace App\Jobs;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Models\reservation;

class CheckReservationStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $now = Carbon::now();

    $expiredReservations = reservation::where('dateR', '<=', $now)->get();

    foreach ($expiredReservations as $reservation) {
    
        $voiture = $reservation->voiture;
        $voiture->disponibilite = 1; 
        $voiture->save();
        $reservation->delete();
    }
}
}

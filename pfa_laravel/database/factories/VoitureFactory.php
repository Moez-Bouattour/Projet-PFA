<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'marque' => fake()->company,
            'Annee' => fake()->year(),
            'modele' => fake()->text($maxNbChars = 20),
            'type' => fake()->word,
            'ville' => fake()->text($maxNbChars = 10),
            'prixJ' => fake()->randomFloat(),
            'disponibilite' => fake()->randomDigit(0,1),
            'Kilometrage' => fake()->randomFloat(),
            'Immatricule' => fake()->text($maxNbChars = 15),
            'image' => fake()->imageUrl(),
        ];
    }
}

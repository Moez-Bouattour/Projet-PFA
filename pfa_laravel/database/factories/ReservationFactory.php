<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::pluck('id')->random(),
            'voiture_id' => \App\Models\Voiture::pluck('id')->random(),
            'dateL' => fake()->dateTime,
            'dateR' => fake()->dateTime,
        ];
    }
}

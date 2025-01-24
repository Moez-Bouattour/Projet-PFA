<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id('id');
            $table->string('Annee');
            $table->boolean('Disponibilite')->default(0);
            $table->double('Kilometrage');
            $table->string('Immatricule');
            $table->double('prixJ');
            $table->string('image');
            $table->integer('id_ville');
            $table->integer('id_modele');
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChangePasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) 
{
    return $request->user();
});
Route::get('voitures',[VoitureController::class,'getVoiture']);
Route::get('voiture/{id}',[VoitureController::class,'getVoitureById']);
Route::post('addVoiture',[VoitureController::class,'addVoiture']);  
Route::get('villes',[VilleController::class,'getVilles']);
Route::put('updateVoiture/{id}',[VoitureController::class,'updateVoiture']);
Route::delete('deleteVoiture/{id}',[VoitureController::class,'deleteVoiture']);
Route::get('search',[VoitureController::class,'searchVoiture']);

Route::get('reservation',[ReservationController::class,'index']);
Route::get('reservation/{id}',[ReservationController::class,'getReservationById']);
Route::post('addReservation',[ReservationController::class,'addReservation']); 
Route::put('updateReservation/{id}',[ReservationController::class,'updateReservation']); 
Route::delete('deleteReservation/{id}',[ReservationController::class,'deleteReservation']);
Route::post('confirmReservation/{id}',[ReservationController::class,'confirmReservation']);

Route::get('users',[UserController::class,'getUsers']);
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::delete('deleteUser/{id}',[UserController::class,'deleteUser']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return Auth::user();
});
Route::get('user/{id}',[UserController::class,'getUser']);
Route::post('sendPasswordResetLink', [ResetPasswordController::class,'sendEmail']);
Route::post('resetPassword', [ChangePasswordController::class,'process']);
Route::put('updateUser/{id}',[UserController::class,'updateUser']);
Route::put('updatePass/{id}',[UserController::class,'updatePass']);

Route::get('getReclamation',[ReclamationController::class,'getReclamations']);
Route::post('ajouterReclamation',[ReclamationController::class,'addReclamation']);

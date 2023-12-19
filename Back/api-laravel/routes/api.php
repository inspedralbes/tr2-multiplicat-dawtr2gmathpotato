<?php
use App\Http\Controllers\PreguntesController;
use App\Http\Controllers\UsuariosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UsuariosController::class, 'register']);
Route::post('/login', [UsuariosController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::resource('preguntes', PreguntesController::class);
Route::post('/preguntes',[PreguntesController::class, 'afegir']);
Route::get('/preguntes/random', [PreguntesController::class, 'getPreguntasRandom']);
Route::get('/preguntes/count', [PreguntesController::class, 'getCountPreguntas']);
Route::put('/preguntes/{id_pregunta}', [PreguntesController::class, 'updatePregunta']);
Route::delete('/preguntes/{id_pregunta}', [PreguntesController::class, 'deletePregunta']);
Route::get('/preguntes/validar-pregunta/{id_pregunta}', [PreguntesController::class, 'validarPregunta']);


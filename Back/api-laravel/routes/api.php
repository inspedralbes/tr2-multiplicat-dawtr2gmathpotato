<?php
use App\Http\Controllers\PreguntasController;
use App\Http\Controllers\UsuariosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/register', [UsuariosController::class, 'register']);
Route::post('/login', [UsuariosController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [UsuariosController::class, 'logout']);
    Route::post('PerfilUsuari', [UsuarisController::class, 'PerfilUsuari']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::resource('preguntes', PreguntesController::class);
Route::post('/preguntes',[PreguntasController::class, 'afegir']);
Route::get('/preguntes/random', [PreguntasController::class, 'getPreguntasRandom']);
Route::get('/preguntes/count', [PreguntasController::class, 'getCountPreguntas']);
Route::put('/preguntes/{id_pregunta}', [PreguntasController::class, 'updatePregunta']);
Route::delete('/preguntes/{id_pregunta}', [PreguntasController::class, 'deletePregunta']);
Route::get('/preguntes/validar-pregunta/{id_pregunta}', [PreguntasController::class, 'validarPregunta']);
Route::post('/preguntes/activar/{id}', [PreguntasController::class, 'activarPregunta']);



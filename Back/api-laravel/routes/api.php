<?php
use App\Http\Controllers\PreguntesController;
use App\Http\Controllers\UsuarisController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [UsuarisController::class, 'register']);
Route::post('login', [UsuarisController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('logout', [UsuarisController::class, 'logout']);
    Route::get('PerfilUsuari', [UsuarisController::class, 'PerfilUsuari']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::resource('preguntes', PreguntesController::class);
Route::post('/preguntes',[PreguntesController::class, 'afegir']);
Route::get('/mostrar/{id}', [PreguntesController::class, 'mostrar']);

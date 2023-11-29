<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Preguntas; 

class PreguntesController extends Controller
{
    public function index()
    {
        return Preguntas::all();
    }   
    public function afegir(Request $request)
    {
        $request->validate([
            'pregunta' => 'required|string|max:255',
            'user' => 'required|string',
        ]);
        $pregunta = new Preguntas();
        $pregunta->pregunta=$request -> pregunta;
        $pregunta->user=$request -> user;
        $pregunta->save();
        return response()->json([
            'status' => 1,
            'message' => 'Pregunta afegida correctament'
        ]);
    }
    public function mostrar( $id)
    {
        return Preguntas::find($id);
    }

   
}

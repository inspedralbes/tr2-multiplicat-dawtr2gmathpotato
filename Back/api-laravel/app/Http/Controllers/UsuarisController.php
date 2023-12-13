<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;

class UsuarisController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50',
            'email' => 'required|string|email|unique:usuaris',
            'password' => 'required|string|min:6|confirmed',
            'foto_perfil' => [
                'required',
                Rule::in(['1', '2', '3']),
            ],
        ]);

        $usuari = new Usuarios();
        $usuari->username = $request->username;
        $usuari->email = $request->email;
        $usuari->password = Hash::make($request->password);
        $usuari->foto_perfil = $request->foto_perfil;
        $usuari->save();

        return response()->json([
            'status' => 1,
            'message' => 'Usuari creat correctament'
        ]);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string|min:6',
    ]);

    $usuari = Usuarios::where("email", "=", $request->email)->first();

    if ($usuari) {  // Verifica si $usuari no es null
        if (Hash::check($request->password, $usuari->password)) {
            $token = $usuari->createToken('auth_token')->plainTextToken;
            return response()->json([
                'status' => 1,
                'message' => 'Usuari logejat correctament',
                'token' => $token
            ]);
        } else {
            return response()->json([
                'status' => 0,
                'message' => 'Contrasenya incorrecta'
            ]);
        }
    } else {
        return response()->json([
            'status' => 0,
            'message' => 'Usuari no registrat'
        ]);
    }
}

    
    public function logout(){
       
    }
    public function PerfilUsuari( ){
    }
}

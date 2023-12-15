<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;

class usuariosController extends Controller
{
    public function register(Request $request) {
        
            
            $request->validate([
                'nombre_usuario' => 'required|string|max:50',
                'email' => 'required|string|email|unique:usuarios',
                'contraseña' => 'required|string|min:6|confirmed',
                'foto_perfil' => [
                    'required',
                    Rule::in([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                ],
            ]);
            $usuario = new Usuarios();
            $usuario->nombre_usuario = $request->nombre_usuario;
            $usuario->email = $request->email;
            $usuario->contraseña = Hash::make($request->contraseña);
            $usuario->foto_perfil = $request->foto_perfil;
           
            $usuario->save();
    
            return response()->json([
                'status' => 1,
                'message' => 'usuario creat correctament'
            ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'contraseña' => 'required|string|min:6',
        ]);

        // Cambia la línea siguiente para asignar el resultado de la consulta a $usuario
        $usuario = Usuarios::where("email", "=", $request->email)->first();

        if ($usuario) {
            if (Hash::check($request->contraseña, $usuario->contraseña)) {
                $token = $usuario->createToken('auth_token')->plainTextToken;
                
                return response()->json([
                    'status' => 1,
                    'message' => 'Inicio de sesión exitoso',
                    'usuario' => $usuario,
                    'token' => $token
                ]);
            } else {
                return response()->json([
                    'status' => 0,
                    'message' => 'Contraseña incorrecta'
                ]);
            }
        } else {
            return response()->json([
                'status' => 0,
                'message' => 'Usuario no registrado'
            ]);
        }
    }
    public function logout(){
       
    }
    public function Perfilusuario( ){
    }
}

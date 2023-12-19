<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Usuarios;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Hash;

class usuariosController extends Controller
{
    public function register(Request $request) {


            $request->validate([
                'username' => 'required|string|max:50',
                'email' => 'required|string|email|unique:usuarios',
                'password' => 'required|string|min:6|confirmed',
                'foto_perfil' => [
                    'required',
                    Rule::in([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                ],
            ]);
            $usuario = new Usuarios();
            $usuario->username = $request->username;
            $usuario->email = $request->email;
            $usuario->password = Hash::make($request->password);
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
            'password' => 'required|string|min:6',
        ]);

        // Cambia la línea siguiente para asignar el resultado de la consulta a $usuario
        $usuario = Usuarios::where("email", "=", $request->email)->first();

        if ($usuario) {
            if (Hash::check($request->password, $usuario->password)) {

                return response()->json([
                  'username' => $usuario->username,
                  'foto_perfil' => $usuario->foto_perfil
                ]);
            } else {
                return response()->json([
                    'status' => 0,
                    'message' => 'password incorrecta'
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
        Auth::logout();
        
        return response()->json([
            'status' => 1,
            'message' => 'Logout exitoso'
        ]);
    }
    public function Perfilusuario( ){
    }
    public function ranking()
{
    $usuarios = Usuarios::select(
        'username',
        'num_victorias',
        DB::raw('(num_victorias / (num_victorias + num_derrotas)) * 100 as porcentaje_victorias')
    )
    ->orderByDesc('num_victorias')
    ->orderByDesc('porcentaje_victorias', 'desc')
    ->limit(10)
    ->get();

    // Formatear el porcentaje_victorias a dos decimales
    $usuarios->transform(function ($usuario) {
        $usuario->porcentaje_victorias = number_format($usuario->porcentaje_victorias, 2);
        return $usuario;
    });

    return response()->json($usuarios);

}

    
}

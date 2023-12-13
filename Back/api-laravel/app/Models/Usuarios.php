<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuarios extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'usuarios';

    protected $primaryKey = 'id'; // Agrega esta línea para configurar la clave primaria.

    protected $fillable = [
<<<<<<< HEAD
        'id',
        'name',
=======
        'username',
>>>>>>> origin/crear-usuario-afegir-preguntas
        'email',
        'password',
<<<<<<< HEAD
        'foto_perfil'
=======
        'foto_perfil',
>>>>>>> develop
    ];

    public $timestamps = false;
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuarios extends Model
{
    use Notifiable, HasApiTokens;

    protected $table = 'usuarios';

    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'username',
        'email',
        'password',
        'foto_perfil',
        'num_victorias',
        'num_derrotas',
        'porcentaje_victorias',
    ];

    public $timestamps = false;
}

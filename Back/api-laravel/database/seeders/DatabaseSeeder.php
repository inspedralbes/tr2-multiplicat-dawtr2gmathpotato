<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $sqlFile = storage_path('app/preguntas.sql'); // Suponiendo que 'preguntas.sql' está en el directorio 'storage/app'

        if (file_exists($sqlFile)) {
            DB::unprepared(file_get_contents($sqlFile));
        } else {
            echo "Archivo SQL no encontrado: $sqlFile";
        }
    }
}


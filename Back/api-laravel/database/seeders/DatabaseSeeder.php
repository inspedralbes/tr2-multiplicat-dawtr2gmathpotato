<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $sqlFile = storage_path('app/preguntas.sql');
        try {
            if (file_exists($sqlFile)) {
                DB::unprepared(file_get_contents($sqlFile));
                $this->command->info('Seeder ejecutado exitosamente.');
            } else {
                $this->command->error("Archivo SQL no encontrado: $sqlFile");
            }
        } catch (\Exception $e) {
            $this->command->error("Error al ejecutar el seeder: " . $e->getMessage());
        }
    }
}


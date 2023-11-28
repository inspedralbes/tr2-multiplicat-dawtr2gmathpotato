<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Crear tabla users
        Schema::create('usuaris', function (Blueprint $table) {
            $table->string('username', 50);
            $table->string('email', 50)->unique();
            $table->string('password', 15);
            $table->integer('num_victorias');
            $table->integer('num_derrotas');
            $table->enum ('foto_perfil', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
            }    
        ); 

       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};

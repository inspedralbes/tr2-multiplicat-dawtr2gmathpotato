**COM DESPLEGAR MATH POTATO**:

**Important**: En cas de tenir establert l'entorn de prodcucció i preproducció, salteu al pas **5**

1. Crear domini (important que tingui support DNS)
2. Crear la base de dades remota (**Important que el domini i la BBDD s'aixequin desde el mateix usuari, i que per tant es trobin en el mateix host**)
3. L'estructura de la base de dades es pot obtenir fácilment fent un php artisan migrate en local (amb XAMPP habilitat per mysql), exportant la base de dades resultant, i important l'estructura i els continguts a la base de dades remota.
5. Executar les ordres **composer install**, **cp .env.example .env** i **php artisan key:generate** en el directori de api-laravel
4. Editar el fitxer .env per a que inclogui les credencials de la base de dades remota.

EN CONSTRUCCIÓ...
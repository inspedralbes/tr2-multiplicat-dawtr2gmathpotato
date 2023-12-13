**COM DESPLEGAR MATH POTATO**:

**Important**: En cas de tenir establert l'entorn de prodcucció i preproducció, salteu al pas **5**

1. Crear domini (important que tingui support DNS)
2. Crear la base de dades remota (**Important que el domini i la BBDD s'aixequin desde el mateix usuari, i que per tant es trobin en el mateix host**)
3. Fer un npm run build sobre el projecte i pujarlo al servidor **Atenció: cal assegurar-se de que el vite-config.vue te com a base './'**
4. L'estructura de la base de dades es pot obtenir fácilment fent un php artisan migrate en local (amb XAMPP habilitat per mysql), exportant la base de dades resultant, i important l'estructura i els continguts a la base de dades remota.
5. Executar l'ordre **cp .env.example .env** i dins tindrem que posar les dades que siguin necessaries en el .env per poder així connectar la base de dades, després fem un **php artisan key:generate** en el directori de api-laravel
   
   

EN CONSTRUCCIÓ...

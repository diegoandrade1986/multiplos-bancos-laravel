<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(\App\User::class,1)->create([
            'name' => 'teste',
            'email' => 'user@user.com',
            'password' => bcrypt('12345')
        ]);
        factory(\App\Models\SecaoTecnica::class,1)->create([
            'sigla' => 'teste',
            'descricao' => 'teste descrição'
        ]);
    }
}

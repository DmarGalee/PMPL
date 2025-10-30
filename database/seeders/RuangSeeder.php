<?php

namespace Database\Seeders;  // PASTIKAN ADA

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RuangSeeder extends Seeder  // NAMA CLASS HARUS SAMA DENGAN NAMA FILE
{
    public function run(): void
    {
        DB::table('m_ruang')->insert([
            [
                'ruang_id' => 1,
                'lantai_id' => 9,
                'ruang_kode' => 'RT01',
                'ruang_nama' => 'Ruang Teori 01',
                'ruang_keterangan' => 'Ruang ini untuk apa yaa',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ruang_id' => 2,
                'lantai_id' => 9,
                'ruang_kode' => 'RT02',
                'ruang_nama' => 'Ruang Teori 02',
                'ruang_keterangan' => 'Ruang ini untuk apa yaa',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ruang_id' => 3,
                'lantai_id' => 9,
                'ruang_kode' => 'RT03',
                'ruang_nama' => 'Ruang Teori 03',
                'ruang_keterangan' => 'Ruang ini untuk apa yaa',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categori extends Model
{
//    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'description',
        'img',
        'status',
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'player_id',
        'username',
        'password_hash',
    ];

    public function player() {
        return $this->belongsTo('Player');
    }
}

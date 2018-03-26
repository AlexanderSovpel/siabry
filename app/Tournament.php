<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    public function squads() {
        return $this->hasMany('App\Squad');
    }

    public function currency() {
        return $this->hasOne('App\Currency', 'id', 'currency_id');
    }
}

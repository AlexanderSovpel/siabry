<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'birthday',
        'hand_used',
        'email',
        'mobile',
        'country_id',
        'city'
    ];

    public function applications() {
        return $this->belongsToMany('App\Squad', 'applications')->withTimestamps();
    }

    public function country() {
        return $this->hasOne('App\Country', 'id', 'country_id');
    }

    public function user() {
        return $this->hasOne('App\User');
    }
}

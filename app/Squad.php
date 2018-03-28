<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Squad extends Model
{
    public function tournament() {
        return $this->belongsTo('App\Tournament');
    }

    public function players() {
        return $this->belongsToMany('App\Player', 'applications')
            ->withTimestamps()
            ->withPivot('waiting_list')
            ->orderBy('applications.created_at', 'asc');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
  protected $fillable = [
    'tournament_id',
    'player_id',
    'squad_id',
    'waiting_list',
  ];

  public function player() {
    return $this->belongsTo('App\Player');
  }

  public function squad() {
    return $this->belongsTo('App\Squad');
  }

  public function tournament() {
    return $this->tournament('App\Tournament');
  }
}

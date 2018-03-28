<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Controllers\Controller;

class PlayersController extends Controller {
  public function index() {
    $players = Player::all();
    foreach ($players as $player) {
      $player->country;
      $player->squads;
    }
    return $players;
  }

  public function get(Player $player) {
    $player->country;
    $player->squads;
    return $player;
  }

  public function applications(Player $player) {
    return $player->applications;
  }

  public function credentials(Player $player) {
    return $player->user;
  }
}
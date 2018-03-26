<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Controllers\Controller;

class PlayersController extends Controller {
  public function index() {
    $players = Player::all();
    foreach ($players as $player) {
      $player->country;
      $player->applications;
    }
    return $players;
  }

  public function get(Player $player) {
    $player->country;
    $player->applications;
    return $player;
  }

  public function applications(Player $player) {
    return $player->applications;
  }
}
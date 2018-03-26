<?php

namespace App\Http\Controllers;

use App\Tournament;
use App\Http\Controllers\Controller;

class TournamentsController extends Controller {
  public function index() {
    $tournaments = Tournament::all();
    foreach ($tournaments as $tournament) {
      $tournament->currency;
    }
    return $tournaments;
  }

  public function get(Tournament $tournament) {
    $tournament->currency;
    return $tournament;
  }
}

?>

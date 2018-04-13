<?php

namespace App\Http\Controllers;

use App\Squad;
use App\Http\Controllers\Controller;

class SquadsController extends Controller {
  public function index() {
    $days = Squad::all()->groupBy('start_date');
    foreach ($days as $day) {
        foreach ($day as $squad) {
            $squad->players;
        }
    }
    return $days;
  }

  public function get(Squad $squad) {
    $squad->players;
    return $squad;
  }

  public function players(Squad $squad) {
    // return $squad->players->sortBy('first_name')->values();
    return $squad->players;
  }
}

?>

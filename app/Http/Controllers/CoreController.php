<?php

namespace App\Http\Controllers;

use App\Country;
use App\Currency;
use App\Http\Controllers\Controller;

class CoreController extends Controller {
  public function countries() {
    return Country::all();
  }

  public function currencies() {
    return Currency::all();
  }
}
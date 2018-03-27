<?php

namespace App\Http\Controllers;

use App\Country;
use App\Currency;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CoreController extends Controller {
  public function countries() {
    return Country::all();
  }

  public function currencies() {
    return Currency::all();
  }

  public function tables() {
    $tables = DB::select('SELECT table_name FROM information_schema.tables WHERE table_schema="tmaster"');
    return $tables;
  }
}
<?php

namespace App\Http\Controllers;

use App\Application;
use App\Player;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApplicationsController extends Controller {
  public function index() {
    return Application::all();
  }

  public function get(Application $application) {
    return $application;
  }

  public function create(Request $request) {
    $player = Player::find($request->input('player_id'));
    Application::where('player_id', $player->id)->delete();

    $applications = $request->input('applications');
    foreach ($applications as $application) {
        Application::create($application);
    }

    return $player->applications;
  }

  public function update(Request $request, Application $application) {
    $application->update($request->all());
    return response()->json($application, 200);
  }

  public function delete(Application $application) {
    $application->delete();
    return response()->json(null, 204);
  }
}
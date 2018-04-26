<?php

namespace App\Http\Controllers;

use App\Application;
use App\Player;
use App\Mail\ApplicationSent;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApplicationsController extends Controller {
  public function index() {
    return Application::all();
  }

  public function get(Application $application) {
    return $application;
  }

  public function compareApplications($applicationA, $applicationB) {
    return $applicationA['squad_id'] - $applicationB['squad_id'];
  }

  public function create(Request $request) {
    $oldApplications = Application::where('player_id', $request->input('player_id'))->get();
    $newApplications = $request->input('applications');

    $bookingsToDelete = array_udiff($oldApplications->toArray(), $newApplications, [$this, 'compareApplications']);
    foreach ($bookingsToDelete as $key => $value) {
      $oldApplications[$key]->delete();
    }

    $bookingsToCreate = array_udiff($newApplications, $oldApplications->toArray(), [$this, 'compareApplications']);
    foreach ($bookingsToCreate as $key => $value) {
      Application::create($value);
    }

    $bookingsToUpdate = array_uintersect($newApplications, $oldApplications->toArray(), [$this, 'compareApplications']);
    foreach ($bookingsToUpdate as $key => $value) {
      $existingApplication = $oldApplications->where('squad_id', $value['squad_id'])->first();
      if ($value['waiting_list'] != $existingApplication->waiting_list) {
        $existingApplication->update([
          'waiting_list' => $value['waiting_list']
        ]);
      }
    }

    $player = Player::find($request->input('player_id'));
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

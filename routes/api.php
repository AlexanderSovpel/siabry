<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Remove this in prod
// header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Access-Control-Allow-Credentials: true');

Route::get('applications', 'ApplicationsController@index');
Route::get('applications/{application}', 'ApplicationsController@get');
Route::post('applications', 'ApplicationsController@create');
Route::put('applications/{application}', 'ApplicationsController@update');
Route::delete('applications/{application}', 'ApplicationsController@delete');

Route::post('login', 'AuthController@login');
Route::post('registration', 'AuthController@register');
Route::get('emailExists/{email}', 'AuthController@emailExists');
Route::get('usernameExists/{username}', 'AuthController@usernameExists');
Route::post('resetPassword', 'AuthController@resetPasswordRequest');
Route::post('changePassword', 'AuthController@changePassword');

Route::get('countries', 'CoreController@countries');
Route::get('currencies', 'CoreController@currencies');

Route::get('players', 'PlayersController@index');
Route::get('players/{player}', 'PlayersController@get');
Route::get('players/{player}/applications', 'PlayersController@applications');
Route::get('players/{player}/credentials', 'PlayersController@credentials');

Route::get('squads', 'SquadsController@index');
Route::get('squads/{squad}', 'SquadsController@get');
Route::get('squads/{squad}/applications', 'SquadsController@players');

Route::get('tables', 'CoreController@tables');

Route::get('tournaments', 'TournamentsController@index');
Route::get('tournaments/{tournament}', 'TournamentsController@get');

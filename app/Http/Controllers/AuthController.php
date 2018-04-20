<?php

namespace App\Http\Controllers;

use App\Player;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Exception;


class AuthController extends Controller {
  public function emailExists($email) {
    $existingPlayer = Player::where('email', $email)->first();
    if ($existingPlayer) {
      $existingUser = User::where('player_id', $existingPlayer->id)->first();
      return $existingUser;
    }
    return $existingPlayer;
  }

  public function usernameExists($username) {
    $existingUser = User::where('username', $username)->first();
    return $existingUser;
  }

  public function login(Request $request) {
    $playerCredentials = $this->usernameExists($request['username']);
    if (!$playerCredentials) {
      $playerCredentials = $this->emailExists($request['username']);
    }

    if ($playerCredentials) {
      if (Hash::check($request['password'], $playerCredentials->password_hash)) {
        $player = Player::find($playerCredentials->player_id);
        $player->applications;
        return $player;
      } else {
        throw new Exception('Неверный пароль');
      };
    } else {
      throw new Exception('Имя пользователя не зарегистрировано');
    }

  }

  public function register(Request $request) {
    $player = $request->input('player');
    $credentials = $request->input('credentials');

    if ($this->emailExists($player['email']) || $this->usernameExists($credentials['username'])) {
      return 'user exists';
    }

    $newPlayer = Player::create([
      'first_name' => $player['firstName'],
      'middle_name' => $player['middleName'],
      'last_name' => $player['lastName'],
      'gender' => $player['gender'],
      'birthday' => new \DateTime($player['birthday']),
      'hand_used' => $player['handUsed'],
      'email' => $player['email'],
      'mobile' => $player['mobile'],
      'country_id' => $player['country'],
      'city' => $player['city']
    ]);
    $newPlayer->applications;

    $newCredentials = User::create([
      'player_id' => $newPlayer->id,
      'username' => $credentials['username'],
      'password_hash' => Hash::make($credentials['password'])
    ]);

    return $newPlayer;
  }

  public function resetPasswordRequest(Request $request) {
    if ($this->emailExists($request['email'])) {
      $email = encrypt($request['email']);
      mail(
        $request['email'],
        'Восстановление пароля',
        'http://siabry.test/passwordChange/'.$email
      );
      return 'check your email for reset link';
    } else {
      return 'email is not registred';
    }
  }

  public function changePassword(Request $request) {
    $email = decrypt($request['emailEncr']);
    $player = Player::where('email', $email)->first();
    if ($player) {
      $user = User::where('player_id', $player->id)->first();
      $user->password_hash = Hash::make($request['password']);
      $user->save();
      return 'password was changed';
    }
    return 'invalid link';

  }
}

?>

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Exception;

class GoogleController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }
    public function handleProviderCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                Auth::login($user);
            } else {
                $name = $googleUser->getName();
                $email = $googleUser->getEmail();
                $id = $googleUser->getId();

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $id,
                ]);
                Auth::login($user);
            }
            return response()->json(['token' => $user->createToken('auth_token')->plainTextToken], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đăng nhập thất bại: ' . $th->getMessage()], 500);
        }
    }
}

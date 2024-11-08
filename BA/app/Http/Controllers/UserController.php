<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'required|string',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role' =>1,
                'email_verified_at' => now(),
            ]);

            return response()->json([
                'message' => 'Đăng ký thành công!',
                'user' => $user,
            ], 201);
        }catch (\Exception $exception){
            return response()->json(['message' => $exception->getMessage()], 500);
        }
}
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->login)
            ->orWhere('phone', $request->login)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->id,
            'token' => $token,
            'message' => 'Đăng nhập thành công'
        ]);
    }



    public function create()
    {
    }

    public function store(Request $request)
    {
    }


    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $request->validate([
                'name' => 'nullable|string',
                'password' => 'required|string',
                'oldPw' => 'nullable|string',
            ]);
            if (Hash::check($request->oldPw, $user->password)) {
                $user->update([
                    'name' => $request->name ?? $user->name,
                    'password'=>Hash::make($request->password),
                ]);
                return response()->json([
                    'message' => 'Sủa Dữ Liệu Thành Công',
                    'user' => $user
                ]);
            } else {
                return response()->json([
                    'message' => 'Sai mật khẩu',
                    'user' => $user
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Sữa Dữ Liệu Không Thành Công!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy người dùng với email này.'], 404);
        }
        $token = Password::createToken($user);
        $url = 'http://localhost:3000/reset-password?token=' . $token . '&email=' . urlencode($user->email);

        Mail::send('emails.reset-password', ['url' => $url], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Khôi phục mật khẩu');
        });

        return response()->json(['message' => 'Đã gửi liên kết khôi phục mật khẩu đến email của bạn.']);
    }
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
            'token' => 'required'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Đổi mật khẩu thành công!'])
            : response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại.'], 400);
    }
}

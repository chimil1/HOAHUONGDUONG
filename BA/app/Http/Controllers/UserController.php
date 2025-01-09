<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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

        if ($user->role == 2) {
            return response()->json(['message' => 'Tài khoản này đã bị khóa'], 403);
        }
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác'], 401);
        }
        $user->update(['last_login' => Carbon::now()]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->id,
            'last_login_at' => $user->last_login,
            'token' => $token,
            'message' => 'Đăng nhập thành công'
        ]);
    }
    public function getMonthlyUserStats(Request $request)
    {
        // Lấy 7 ngày gần nhất
        $startDate = Carbon::now()->subDays(6); // Lấy ngày cách đây 6 ngày
        $endDate = Carbon::now();

        // Tạo mảng để lưu kết quả theo từng ngày
        $loginStats = [];

        // Lặp qua từng ngày trong 7 ngày
        for ($i = 0; $i <= 6; $i++) {
            $date = Carbon::now()->subDays($i); // Lấy ngày từ hôm nay và lùi lại
            $dayName = $date->format('l'); // Tên ngày trong tuần (ví dụ: Monday, Tuesday, ...)

            // Đếm số người đăng nhập trong ngày cụ thể
            $usersLoggedInThisDay = User::whereDate('last_login', $date->toDateString())
                ->count();

            // Thêm kết quả vào mảng
            $loginStats[] = [
                'day' => $dayName,
                'date' => $date->toDateString(),
                'users_logged_in' => $usersLoggedInThisDay
            ];
        }

        // Trả về kết quả dưới dạng JSON
        return response()->json([
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'login_stats' => $loginStats
        ]);
    }
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required'
        ]);

        try {
            $user = User::where('email', $request->login)
                ->orWhere('phone', $request->login)
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác'], 401);
            }

            if ($user->role == 2) {
                return response()->json(['message' => 'Tài khoản này đã bị khóa'], 402);
            }

            if ($user->role !== 0) {
                return response()->json(['message' => 'Bạn không có quyền truy cập'], 403);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user->id,
                'token' => $token,
                'message' => 'Đăng nhập thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi trong quá trình đăng nhập', 'error' => $e->getMessage()], 500);
        }
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
                'password' => 'nullable|string',
                'oldPw' => 'nullable|string',
                'lock' => 'nullable|boolean',
            ]);
            if ($request->oldPw && !Hash::check($request->oldPw, $user->password)) {
                return response()->json([
                    'message' => 'Sai mật khẩu',
                    'user' => $user
                ]);
            }
            if ($request->lock !== null) {
                $user->update([
                    'role' => $request->lock ? 2 : $user->role,
                ]);

                return response()->json([
                    'message' => $request->lock ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
                    'user' => $user
                ]);
            }

            // Nếu không có yêu cầu khóa, tiếp tục với các trường hợp khác (cập nhật thông tin)
            $user->update([
                'name' => $request->name ?? $user->name,
                'password' => $request->password ? Hash::make($request->password) : $user->password,  // Chỉ cập nhật mật khẩu nếu có
            ]);

            return response()->json([
                'message' => 'Sửa dữ liệu thành công',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Sửa dữ liệu không thành công!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function lock($id, Request $request){
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Không tìm thấy khách hàng'], 400);
            }
            $user->role = $request->lock ? 2 : 1;
            $user->save();

            return response()->json(['message' => $request->lock ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản', 'user' => $user], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
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

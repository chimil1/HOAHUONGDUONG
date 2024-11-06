<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;


class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {

        try {
            $category = Category::create(
                [
                    'name' => $request->name,
                    'description' => $request->description,
                    'img' => $request->img,
                    'status' => $request->status,
                ]
            );
            return response()->json([
                'success' => true,
                'message' => 'Thêm dữ liệu thành công.',
                'data' => $category,
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Thêm dữ liệu không thành công.',
            ], 500);
        }
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        try {
            $category->update([
                'name' => $request->name,
                'description' => $request->description,
                'img' => $request->img,
                'status' => $request->status,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Sửa dữ liệu thành công.',
                'data' => $category,
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Sửa dữ liệu không thành công.',
            ], 500);
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return response()->json(['message' => 'Đã xóa danh mục thành công'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Danh mục tồn tại sản phẩm không thể xóa',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

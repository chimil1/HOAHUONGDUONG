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
            if ($request->hasFile('img')) {
                $image = $request->file('img');
                $imageName = time() . '_' . $image->getClientOriginalName();
                if ($image->move(public_path('images'), $imageName)) {
                    $imagePath = '/images/' . $imageName;
                } else {
                    return response()->json(['success' => false, 'message' => 'Không thể di chuyển tệp vào thư mục.'], 500);
                }
            }
            
            $category = Category::create(
                [
                    'name' => $request->name,
                    'description' => $request->description,
                    'img' => $request->img,
                    'status' => $request->status,
                ]
            );
            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Thêm dữ liệu không thành công.',
                ], 500);
            }
            return response()->json($category);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Thêm dữ liệu không thành công.',
            ], 500);
        }
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
        }catch(\Exception $exception){
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Sửa dữ liệu không thành công.',
            ], 500);
        }
        $deleteCategory =  $category->delete();
        if (!$deleteCategory) {
            return response()->json(['message' => 'Xóa danh mục không thành công'], 200);
        }
        return response()->json(['message' => 'Đã xóa danh mục thành công'], 200);
    }catch (\Exception $e) {
        return response()->json([
           'message' => 'Danh mục tồn tại sản phẩm không thể xóa',
            'error' => $e->getMessage()
        ], 500);
    }
    }
}

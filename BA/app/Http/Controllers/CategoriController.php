<?php

namespace App\Http\Controllers;
use App\Models\Categori;
use Illuminate\Http\Request;

class CategoriController extends Controller
{
    public function index()
    {
        $categories = Categori::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Categori::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    // Tạo một danh mục mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'img' => 'nullable|string',
            'status' => 'required|integer',
        ]);

        $category = Categori::create($request->all());
        return response()->json($category, 201);
    }

    // Cập nhật thông tin danh mục
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'img' => 'nullable|string',
            'status' => 'required|integer',
        ]);

        $category = Categori::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->update($request->all());
        return response()->json($category);
    }

    // Xóa danh mục
    public function destroy($id)
    {
        $category = Categori::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}

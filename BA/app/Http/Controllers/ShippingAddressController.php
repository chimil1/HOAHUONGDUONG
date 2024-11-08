<?php

namespace App\Http\Controllers;

use App\Models\ShippingAddress;
use Illuminate\Http\Request;

class ShippingAddressController extends Controller
{
    public function index()
    {
        return ShippingAddress::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shipping_phone' => 'required|max:11',
            'shipping_address' => 'required|max:255',
        ]);

        $address = ShippingAddress::create($validated);

        return response()->json($address, 201);
    }

    public function show($id)
    {
        $address = ShippingAddress::find($id);

        if (!$address) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        return response()->json($address);
    }

    public function update(Request $request, $id)
    {
        $address = ShippingAddress::find($id);

        if (!$address) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shipping_phone' => 'required|max:11',
            'shipping_address' => 'required|max:255',
        ]);

        $address->update($validated);

        return response()->json($address);
    }

    public function destroy($id)
    {
        $address = ShippingAddress::find($id);

        if (!$address) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        $address->delete();

        return response()->json(null, 204);
    }
}

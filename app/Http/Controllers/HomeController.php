<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('home.index');
    }

    public function introShown(Request $request)
    {
        $request->session()->put('intro_shown', true);
        return response()->json(['success' => true]);
    }
}
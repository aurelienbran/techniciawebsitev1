<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LanguageController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/demo', [DemoController::class, 'index'])->name('demo');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::post('/newsletter', [HomeController::class, 'newsletter'])->name('newsletter.subscribe');
Route::post('/intro-shown', [HomeController::class, 'introShown'])->name('intro.shown');

Route::get('/language/{locale}', [LanguageController::class, 'switch'])
    ->name('language')
    ->where('locale', 'en|fr|de|it');
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');

        Route::prefix('management-content')->group(function () {
            Route::get('about', function () {
                return Inertia::render('');
            })->name('admin.management-content.about');
            Route::get('services', function () {
                return Inertia::render('');
            })->name('admin.management-content.services');
            Route::get('portofolio', function () {
                return Inertia::render('');
            })->name('admin.management-content.portfolio');
        });
    });
});

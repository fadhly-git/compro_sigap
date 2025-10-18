<?php


use App\Http\Controllers\Admin\Management_Content\AboutController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');

        Route::prefix('management-content')->group(function () {
            Route::get('about', [AboutController::class, 'index'])->name('admin.management-content.about.index');
            Route::post('about', [AboutController::class, 'update'])->name('admin.management-content.about.update');

            Route::resource('services', ServiceController::class);

            Route::get('portofolio', function () {
                return Inertia::render('');
            })->name('admin.management-content.portfolio');
        });

        Route::prefix('media')->group(function () {
            Route::post('/upload', [MediaController::class, 'upload'])->name('admin.media.upload');
            Route::delete('/delete', [MediaController::class, 'delete'])->name('admin.media.delete');
        });
    });
});

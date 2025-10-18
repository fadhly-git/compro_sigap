<?php


use App\Http\Controllers\Admin\ManagementContent\AboutController;
use App\Http\Controllers\Admin\ManagementContent\ServicesController;
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

            Route::get('services', [ServicesController::class, 'index'])->name('admin.management-content.services.index');
            Route::get('services/create', [ServicesController::class, 'create'])->name('admin.management-content.services.create');
            Route::post('services', [ServicesController::class, 'store'])->name('admin.management-content.services.store');
            Route::get('services/{service}', [ServicesController::class, 'show'])->name('admin.management-content.services.show');
            Route::get('services/{service}/edit', [ServicesController::class, 'edit'])->name('admin.management-content.services.edit');
            Route::post('services/{service}', [ServicesController::class, 'update'])->name('admin.management-content.services.update.post');
            Route::put('services/{service}', [ServicesController::class, 'update'])->name('admin.management-content.services.update');
            Route::delete('services/{service}', [ServicesController::class, 'destroy'])->name('admin.management-content.services.destroy');

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

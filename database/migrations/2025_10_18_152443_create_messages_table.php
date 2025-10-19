<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->boolean('isRead')->default(false);
            $table->timestamp('readAt')->nullable();
            $table->text('adminReply')->nullable();
            $table->timestamp('repliedAt')->nullable();
            $table->unsignedBigInteger('repliedByUserId')->nullable();
            $table->timestamps();

            $table->foreign('repliedByUserId')->references('id')->on('users')->onDelete('set null');
            $table->index(['isRead', 'created_at']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};

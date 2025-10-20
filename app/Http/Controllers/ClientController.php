<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Client::active()->ordered();

        if ($request->has('sector') && $request->sector !== 'all') {
            $query->where('sector', $request->sector);
        }

        $clients = $query->get();
        $sectors = Client::active()
            ->select('sector')
            ->distinct()
            ->pluck('sector');

        return Inertia::render('clients/index', [
            'clients' => $clients,
            'sectors' => $sectors,
            'selectedSector' => $request->sector ?? 'all',
        ]);
    }

    public function show(string $slug): Response
    {
        $client = Client::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('clients/show', [
            'client' => $client,
        ]);
    }
}

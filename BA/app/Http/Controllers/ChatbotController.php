<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ChatbotController extends Controller
{
    public function handleRequest(Request $request)
    {
        $message = $request->input('message');
        $response = $this->getChatbotResponse($message);

        return response()->json([
            'message' => $response
        ]);
    }

    private function getChatbotResponse($message)
    {
        $client = new Client();
        $apiKey = env('OPENAI_API_KEY');

        $response = $client->post('https://api.openai.com/v1/completions', [
            'json' => [
                'model' => 'text-davinci-003',
                'prompt' => $message,
                'max_tokens' => 150
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey
            ]
        ]);

        $body = json_decode($response->getBody(), true);
        return $body['choices'][0]['text'];
    }
}

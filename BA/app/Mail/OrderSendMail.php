<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderSendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $order;
    public $orderDetails;
    /**
     * Create a new message instance.
     */
    public function __construct($order, $orderDetails)
    {
        $this->order = $order;
        $this->orderDetails = $orderDetails;
    }

    /**
     * Get the message envelope.
     */
    
     public function build(){
        return $this->view('emails.order_send_mail')
            ->subject('Hóa đơn mua hàng')
            ->with([
                'order' => $this->order,
                'orderDetails' => $this->orderDetails
            ]);
    }
    
}

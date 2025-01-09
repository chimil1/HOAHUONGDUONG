<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderInvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order, $orderDetail;
    /**
     * Create a new message instance.
     */
    public function __construct($order, $orderDetail)
    {
        $this->order = $order;
        $this->orderDetail = $orderDetail;
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this->view('emails.order_invoice')
            ->subject('Hóa đơn thanh toán')
            ->with([
                'order' => $this->order,
                'orderDetails' => $this->orderDetail
            ]);
    }
}

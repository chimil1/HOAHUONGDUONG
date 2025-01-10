<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hóa đơn đơn hàng</title>
</head>

<body>
    <h1>Hóa đơn mua hàng</h1>
    <p>Cảm ơn bạn đã mua hàng tại Hoa Hướng Dương Store! Dưới đây là chi tiết đơn hàng của bạn:</p>
    <p><strong>Mã đơn hàng:</strong> {{ 'DH' . str_pad($order->id, 3, '0', STR_PAD_LEFT) }}</p>
    <p><strong>Người nhận:</strong> {{ $order->username }}</p>
    <p><strong>Số điện thoại:</strong> {{ $order->user->phone }}</p>
    <p><strong>Địa chỉ giao hàng:</strong> {{ $order->shipping_address }}</p>
    <p><strong>Phương thức thanh toán:</strong>
        @if($order->payment_type == 0)
            Thanh toán khi nhận hàng
        @elseif($order->payment_type == 1)
            Thanh Chuyển khoản
        @endif
    </p>
    <p><strong>Ngày đặt hàng:</strong> {{ $order->created_at->format('d/m/Y H:i') }}</p>

    <h2>Danh sách sản phẩm</h2>
    <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="padding: 8px; text-align: left;">Sản phẩm</th>
                <th style="padding: 8px; text-align: center;">Số lượng</th>
                <th style="padding: 8px; text-align: right;">Đơn giá</th>
                <th style="padding: 8px; text-align: right;">Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orderDetails as $item)
                <tr>
                    <td style="padding: 8px;">{{ $item->product_name }}</td>
                    <td style="padding: 8px; text-align: center;">{{ $item->quantity }}</td>
                    <td style="padding: 8px; text-align: right;">{{ number_format($item->price) }} VNĐ</td>
                    <td style="padding: 8px; text-align: right;">{{ number_format($item->price * $item->quantity) }} VNĐ
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- <h3 style="text-align: right;">Tổng tiền: {{ number_format($order->total) }} VNĐ</h3>

    <p><strong>Ghi chú:</strong> {{ $order->note ?? 'Không có' }}</p> -->

    <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>
    <p>Trân trọng,</p>
    <p>{{ config('Hoa Hướng Dương Store') }}</p>
</body>

</html>

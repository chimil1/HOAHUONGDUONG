<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Khôi phục mật khẩu</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3;
            line-height: 1.6;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
        }
        h2 {
            color: #2c3e50;
            font-size: 24px;
            font-weight: bold;
        }
        p {
            font-size: 16px;
            margin: 15px 0;
        }
        a {
            display: inline-block;
            padding: 12px 25px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
        }
        a:hover {
            background-color: #74d5a9;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div class="container">
    <h2>Kính gửi Quý khách,</h2>
    <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu từ bạn. Vui lòng nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
    <a href="{{ $url }}">Đặt lại mật khẩu</a>
    <p>Nếu bạn không yêu cầu thao tác này, vui lòng bỏ qua email. Tài khoản của bạn sẽ vẫn được bảo vệ.</p>
    <p>Trân trọng,</p>
    <p><strong>HOA HƯỚNG DƯƠNG</strong></p>
    <p>Đây là email tự động. Vui lòng không trả lời email này. Nếu bạn cần hỗ trợ, hãy liên hệ với chúng tôi qua <a href="mailto:tamntpc06002@fpt.edu.vn">tamntpc06002@fpt.edu.vn</a>.</p>
    <div class="footer">
        <p>&copy; 2024 HOA HƯỚNG DƯƠNG. Bảo lưu mọi quyền.</p>
    </div>
</div>
</body>
</html>

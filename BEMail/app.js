const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hoaahuongduongg@gmail.com',
        pass: 'flfvibddgrnfnkep'
    }
});

app.post('/send-email', (req, res) => {
    const userInfo = req.body;
    const mailOptions = {
        from: 'hoaahuongduongg@gmail.com',
        to: userInfo.email,
        subject: 'Chúng tôi rất trân trọng ý kiến đóng góp của bạn',
        text: `
            ${userInfo.name},

            Cảm ơn bạn đã đồng hành cùng Đội ngũ shop Hoa Hướng Dương! Chúng tôi rất trân trọng sự ủng hộ của bạn.

            Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn! Những phản hồi của bạn sẽ giúp chúng tôi cải thiện dịch vụ và mang đến những trải nghiệm tốt hơn cho bạn. Dù là những gợi ý về sản phẩm mới, cách thức nâng cao trải nghiệm mua sắm hay bất kỳ suy nghĩ nào khác, chúng tôi đều muốn lắng nghe.

            Xin vui lòng dành chút thời gian chia sẻ ý kiến của bạn bằng cách trả lời email này hoặc nhấp vào liên kết dưới đây để điền vào mẫu phản hồi nhanh:

            Chúng tôi rất mong được nghe những ý kiến quý giá từ bạn để cải thiện hơn nữa dịch vụ của mình!

            Trân trọng,
            Đội ngũ shop Hoa Hướng Dương`

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('An error occurred while sending email');
        } else {
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
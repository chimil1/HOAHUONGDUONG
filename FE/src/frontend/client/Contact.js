import React, { useState, useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate để chuyển hướng

function Contact() {
    const [data, setData] = useState({
        name: '',
        email: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // Theo dõi trạng thái khi form đã được gửi
    const [error, setError] = useState("");
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Theo dõi trạng thái đăng nhập
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập khi component được render
    useEffect(() => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (token) {
            setIsLoggedIn(true); // Nếu token tồn tại, người dùng đã đăng nhập
        } else {
            setIsLoggedIn(false); // Nếu không có token, người dùng chưa đăng nhập
        }
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setError("Bạn cần đăng nhập để gửi email.");
            return; // Ngừng việc gửi form nếu người dùng chưa đăng nhập
        }

        fetch('http://localhost:4500/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                setIsSubmitted(true);
                setMessage("Bạn đã gửi thành công.");
            } else {
                setError("Vui lòng nhập email của bạn.");
            }
        });
    }

    return (
        <div>
            <Header />
            {/* Tiêu đề trang */}
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: "url('../../asset/images/bg-01.jpg')" }}>
                <h2 className="ltext-105 cl0 txt-center">Góp Ý</h2>
            </section>

            {/* Nội dung trang */}
            <section className="bg0 p-t-104 p-b-116">
                <div className="container">
                    <div className="flex-w flex-tr">
                        <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                            {isLoggedIn ? (
                                <form onSubmit={handleSubmit}>
                                    <h4 className="mtext-105 cl2 txt-center p-b-30">
                                        Gửi tin nhắn cho chúng tôi
                                    </h4>
                                    {message && <div className="alert alert-success">{message}</div>}
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <div className="bor8 m-b-20 how-pos4-parent">
                                        <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="email" name="email" placeholder="Địa chỉ Email của bạn" value={data.email} onChange={handleChange} />
                                        <img className="how-pos4 pointer-none" src="../../asset/images/icons/icon-email.png" alt="ICON" />
                                    </div>

                                    <div className="bor8 m-b-30">
                                        <textarea className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25" type="text" name="name" placeholder="Chúng tôi có thể giúp gì?" value={data.name} onChange={handleChange}></textarea>
                                    </div>

                                    <button className={`flex-c-m stext-101 cl0 size-121 ${isSubmitted ? 'bg4' : 'bg3'} btn btn-outline-dark`} type="submit" disabled={isSubmitted}>
                                        {isSubmitted ? 'Đã gửi' : 'Gửi'}
                                    </button>
                                </form>
                            ) : (
                                <div className="alert alert-warning">Bạn cần đăng nhập để gửi email. <a href="/login">Đăng nhập ngay</a></div>
                            )}
                        </div>

                        <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
                            <div className="flex-w w-full p-b-42">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-map-marker"></span>
                                </span>
                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">Địa chỉ</span>
                                    <p className="stext-115 cl6 size-213 p-t-18">An Khánh, Ninh Kiều, Cần Thơ</p>
                                </div>
                            </div>

                            <div className="flex-w w-full p-b-42">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-phone-handset"></span>
                                </span>
                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">Số điện thoại</span>
                                    <p className="stext-115 cl1 size-213 p-t-18">+84 365 971 807</p>
                                </div>
                            </div>

                            <div className="flex-w w-full">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">Hỗ trợ bán hàng</span>
                                    <p className="stext-115 cl1 size-213 p-t-18">hoahuongduong@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Contact;

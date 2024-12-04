import Header from './layout/Header';
import Footer from './layout/Footer';

function About() {
    return (
        <div>
            <Header></Header>
            {/* Title page */}
            <section
                className="bg-img1 txt-center p-lr-15 p-tb-92 m-t-80"
                style={{ backgroundImage: "url('../../asset/images/bg-01.jpg')" }}
            >
                <h2 className="ltext-105 cl0 txt-center">Giới thiệu</h2>
            </section>
            {/* Content page */}
            <section className="bg0 p-t-75 p-b-120">
                <div className="container">
                    <div className="row p-b-148">
                        <div className="col-md-7 col-lg-8">
                            <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">Câu chuyện của Hoa Hướng Dương</h3>

                                <p className="stext-113 cl6 p-b-26">
                                Hoa Hướng Dương được thành lập với mong muốn mang đến cho mọi người những bộ quần áo, 
                                phụ kiện không chỉ đẹp mà còn mang đậm dấu ấn cá nhân. Chúng tôi tin rằng thời trang là ngôn 
                                ngữ không lời thể hiện cá tính, sự tự tin và phong cách riêng biệt của mỗi người.
                                </p>

                                <p className="stext-113 cl6 p-b-26">
                                Từ những sản phẩm được lựa chọn cẩn thận, đến dịch vụ chăm sóc khách hàng tận tâm, Hoa Hướng Dương 
                                luôn nỗ lực để mỗi khách hàng đều có trải nghiệm mua sắm tuyệt vời. Chúng tôi không chỉ cung cấp sản 
                                phẩm, mà còn mang đến niềm vui, sự tự tin cho khách hàng trong mỗi bộ trang phục họ lựa chọn.
                                </p>

                                <p className="stext-113 cl6 p-b-26">
                                Với tình yêu và sự đam mê thời trang, Hoa Hướng Dương hy vọng trở thành người bạn đồng hành trên 
                                hành trình khẳng định phong cách của bạn.
                                </p>
                            </div>
                        </div>

                        <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                            <div className="how-bor1">
                                <div className="hov-img0">
                                    <img src="../../asset/images/about-01.jpg" alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
                            <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">Sứ mệnh của chúng tôi</h3>

                                <p className="stext-113 cl6 p-b-26">
                                Sứ mệnh của Hoa Hướng Dương là mang đến cho khách hàng những sản phẩm thời trang chất 
                                lượng cao, phong cách độc đáo và giá cả hợp lý. Chúng tôi cam kết cung cấp những bộ quần 
                                áo và phụ kiện giúp tôn vinh vẻ đẹp cá nhân, thúc đẩy sự tự tin và thể hiện phong cách 
                                riêng của mỗi người.
                                </p>
                                <p className="stext-113 cl6 p-b-26">
                                Chúng tôi luôn nỗ lực để tạo ra trải nghiệm mua sắm trực tuyến tiện lợi, an toàn và thân 
                                thiện, với dịch vụ chăm sóc khách hàng tận tâm. Hoa Hướng Dương không chỉ là nơi mua sắm 
                                mà còn là nơi khách hàng tìm thấy niềm vui và cảm hứng trong việc thể hiện bản thân qua thời trang.
                                </p>
                            </div>
                        </div>

                        <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
                            <div className="how-bor2">
                                <div className="hov-img0">
                                    <img src="../../asset/images/about-02.jpg" alt="IMG" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default About;

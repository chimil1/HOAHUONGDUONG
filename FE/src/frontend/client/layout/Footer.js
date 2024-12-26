import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
 
      <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Danh mục</h4>

              <ul>
                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Thời trang dành cho nữ
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Nam
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Túi
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Đồng hồ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Hỗ trợ</h4>

              <ul>
                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                  Theo dõi đơn hàng
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                  Vận chuyển
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">LIÊN HỆ</h4>

              <p className="stext-107 cl7 size-201">
              Bạn có thắc mắc gì không? Hãy cho chúng tôi biết tại cửa hàng ở An Khánh, Ninh Kiều
              Cần Thơ hoặc gọi cho chúng tôi theo số (+84) 365 971 807
              </p>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">BẢN TIN</h4>

              <form>
                <div className="wrap-input1 w-full p-b-4">
                  <input
                    className="input1 bg-none plh1 stext-107 cl7"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <div className="focus-input1 trans-04"></div>
                </div>

                <div className="p-t-18">
                  <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-t-40">
            <div className="flex-c-m flex-w p-b-18">
              <Link to="#" className="m-all-1">
                <img src="../../asset/images/icons/icon-pay-01.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="../../asset/images/icons/icon-pay-02.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="../../asset/images/icons/icon-pay-03.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="../../asset/images/icons/icon-pay-04.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="../../asset/images/icons/icon-pay-05.png" alt="ICON-PAY" />
              </Link>
            </div>

            <p className="stext-107 cl6 txt-center">
             ©HoaHuongDuong All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

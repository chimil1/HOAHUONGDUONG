import { Link } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function AddShipping() {
  return (
    <div>
      <Header />
      <section className="pt-5" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="../../asset/images/avatar.jpg"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">Phạm Việt Hùng</h5>
                  <p className="text-success mb-1">pviethung@gmail.com</p>
                  <p className="text-success mb-4"></p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="text-center my-3">
                    <h5 className="text-muted">Thêm địa chỉ</h5>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên người nhận"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập địa chỉ người nhận"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="mt-3 text-end">
                    <form action="" method="post">
                      <Link to="">
                        <button
                          type="button"
                          className="btn btn-outline-dark me-2"
                        >
                          Đồng ý
                        </button>
                      </Link>
                    </form>
                  </div>
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

export default AddShipping;

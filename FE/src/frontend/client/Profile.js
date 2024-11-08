import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

function Profile() {
  return (
    <div>
      <Header/>
      <section className="pt-5 " style={{ backgroundColor: "#eee" }}>
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
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-github fa-lg"
                        style={{ color: "#333333" }}
                      ></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      ></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-muted">Full Name:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-success mb-0"></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-muted">Email:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-success mb-0"></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-muted">Phone:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-success mb-0"></p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0 text-muted">Address:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-success mb-0"></p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <form action="" method="post">
                      <Link to="">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-dark me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#examppass"
                        >
                          Đổi mật khẩu
                        </button>
                      </Link>
                      <Link name="" className="btn btn-outline-dark me-2" to="/addshipping">Thêm địa chỉ</Link>

                      <Link name="" className="btn btn-outline-dark" to="/shipping">Sửa địa chỉ</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <div
        class="modal fade"
        id="examppass"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content chane">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Đổi Mật Khẩu
              </h5>
              <button
                type="submit"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="" class="form-label">
                  Mật khẩu cũ
                </label>
                <input type="password" class="form-control p0" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Mật khẩu mới
                </label>
                <input type="password" class="form-control p1" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Mật khẩu mới
                </label>
                <input type="password" class="form-control p2" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                name=""
                class="btn btn-success chanepassword"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;

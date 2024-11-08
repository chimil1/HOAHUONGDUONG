import React from 'react';

function ForgotPassword() {

  return (
    <div>
            <section
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Quên mật khẩu</h2>

                  <form>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3cg"
                      ></label>
                    </div>
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-success btn-lg btn-block"
                      type="submit"
                    >
                      Gửi
                    </button>

                    <hr class="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
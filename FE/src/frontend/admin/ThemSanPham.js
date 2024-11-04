import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
function ThemSanPham() {
  return (
    <div class="page-wrapper">
      <Menu></Menu>
      <div class="page-container">
        <Header></Header>
        <header class="header-desktop2 bg-dark">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="header-wrap2">
                <div class="logo d-block d-lg-none">
                  <a href="#">
                    <img src="images/icon/logo-white.png" alt="CoolAdmin" />
                  </a>
                </div>
                <div class="header-button2">
                  <div class="header-button-item js-item-menu">
                    <i class="zmdi zmdi-search"></i>
                    <div class="search-dropdown js-dropdown">
                      <form action="">
                        <input
                          class="au-input au-input--full au-input--h65"
                          type="text"
                          placeholder="Search for datas &amp; reports..."
                        />
                        <span class="search-dropdown__icon">
                          <i class="zmdi zmdi-search"></i>
                        </span>
                      </form>
                    </div>
                  </div>
                  <div class="header-button-item has-noti js-item-menu">
                    <i class="zmdi zmdi-notifications"></i>
                    <div class="notifi-dropdown js-dropdown">
                      <div class="notifi__title">
                        <p>You have 3 Notifications</p>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c1 img-cir img-40">
                          <i class="zmdi zmdi-email-open"></i>
                        </div>
                        <div class="content">
                          <p>You got a email notification</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c2 img-cir img-40">
                          <i class="zmdi zmdi-account-box"></i>
                        </div>
                        <div class="content">
                          <p>Your account has been blocked</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                          <i class="zmdi zmdi-file-text"></i>
                        </div>
                        <div class="content">
                          <p>You got a new file</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__footer">
                        <a href="#">All notifications</a>
                      </div>
                    </div>
                  </div>
                  <div class="header-button-item mr-0 js-sidebar-btn">
                    <i class="zmdi zmdi-menu"></i>
                  </div>
                  <div class="setting-menu js-right-sidebar d-none d-lg-block">
                    <div class="account-dropdown__body">
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-account"></i>Account
                        </a>
                      </div>
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-settings"></i>Setting
                        </a>
                      </div>
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-money-box"></i>Billing
                        </a>
                      </div>
                    </div>
                    <div class="account-dropdown__body">
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-globe"></i>Language
                        </a>
                      </div>
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-pin"></i>Location
                        </a>
                      </div>
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-email"></i>Email
                        </a>
                      </div>
                      <div class="account-dropdown__item">
                        <a href="#">
                          <i class="zmdi zmdi-notifications"></i>Notifications
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="card">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card-header">
                      <div class="col-md-12">
                        <h3 class="title-5 m-b-35">Bảng thêm sản phẩm</h3>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="col-lg-12">
                        <form
                          action=""
                          method="post"
                          enctype="multipart/form-data"
                          class="form-horizontal"
                        >
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="text-input"
                                class=" form-control-label"
                              >
                                Text Input
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <input
                                type="text"
                                id="text-input"
                                name="text-input"
                                placeholder="Text"
                                class="form-control"
                              />
                              <small class="form-text text-muted">
                                This is a help text
                              </small>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="email-input"
                                class=" form-control-label"
                              >
                                Email Input
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <input
                                type="email"
                                id="email-input"
                                name="email-input"
                                placeholder="Enter Email"
                                class="form-control"
                              />
                              <small class="help-block form-text">
                                Please enter your email
                              </small>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="password-input"
                                class=" form-control-label"
                              >
                                Password
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <input
                                type="password"
                                id="password-input"
                                name="password-input"
                                placeholder="Password"
                                class="form-control"
                              />
                              <small class="help-block form-text">
                                Please enter a complex password
                              </small>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="disabled-input"
                                class=" form-control-label"
                              >
                                Disabled Input
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <input
                                type="text"
                                id="disabled-input"
                                name="disabled-input"
                                placeholder="Disabled"
                                disabled=""
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="textarea-input"
                                class=" form-control-label"
                              >
                                Textarea
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <textarea
                                name="textarea-input"
                                id="textarea-input"
                                rows="9"
                                placeholder="Content..."
                                class="form-control"
                              ></textarea>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label for="select" class=" form-control-label">
                                Select
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <select
                                name="select"
                                id="select"
                                class="form-control"
                              >
                                <option value="0">Please select</option>
                                <option value="1">Option #1</option>
                                <option value="2">Option #2</option>
                                <option value="3">Option #3</option>
                              </select>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label
                                for="file-multiple-input"
                                class=" form-control-label"
                              >
                                Multiple File input
                              </label>
                            </div>
                            <div class="col-12 col-md-9">
                              <input
                                type="file"
                                id="file-multiple-input"
                                name="file-multiple-input"
                                multiple=""
                                class="form-control-file"
                              />
                            </div>
                          </div>
                          <div class="right">
                            <button
                              type="submit"
                              class="btn btn-primary btn-sm"
                            >
                              <i class="fa fa-dot-circle-o"></i> Submit
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="card-footer">
                        <Footer></Footer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemSanPham;

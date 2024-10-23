import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
function QlNhanVien() {
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
                      <div class="overview-wrap">
                        <h2 class="title-5 m-b-35">Bảng nhân viên</h2>
                        <a
                          class="au-btn au-btn-icon au-btn--green bg-dark"
                          href="/addpersonnel"
                        >
                          <i class="zmdi zmdi-plus"></i>Thêm nhân viên
                        </a>
                      </div>
                    </div>
                    <div class="card-body">
                      <table class="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên nhân viên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Chức vụ</th>
                            <th>Tuổi</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="tr-shadow">
                            <td></td>
                            <td>Lori Lynch</td>
                            <td>
                              <span class="block-email">lori@example.com</span>
                            </td>
                            <td class="desc">04773843</td>

                            <td>
                              <span class="status--process">Nhân viên</span>
                            </td>
                            <td>18</td>
                            <td>
                              <div class="table-data-feature">
                                <button
                                  class="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Lý lịch"
                                >
                                  <i class="zmdi zmdi-mail-send"></i>
                                </button>
                                <button
                                  class="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Sửa"
                                >
                                  <i class="zmdi zmdi-edit"></i>
                                </button>
                                <button
                                  class="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Xóa"
                                >
                                  <i class="zmdi zmdi-delete"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
  );
}

export default QlNhanVien;

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
function DanhGia() {
  return (
    <div class="page-wrapper">
      <Menu></Menu>

      <div class="page-container">
        <Header></Header>

        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="card">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card-header">
                      <div class="overview-wrap">
                        <h2 class="title-5 m-b-35">Đánh giá</h2>
                      </div>
                    </div>
                    <div class="card-body">
                      <table class="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên người mua</th>
                            <th>Tên sản phẩm</th>
                            <th>Nội dung đánh giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="tr-shadow">
                            <td></td>
                            <td>Lori Lynch</td>
                            <td>124D,12H,Nguyễn văn Linh,cần Thơ.</td>
                            <td>0342453243</td>
                            <td>
                              <div class="table-data-feature">
                                <button
                                  class="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Chi tiết"
                                >
                                  <i class="zmdi zmdi-mail-send"></i>
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

export default DanhGia;

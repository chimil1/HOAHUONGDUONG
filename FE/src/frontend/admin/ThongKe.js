import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function ThongKe() {
  return (
    <div>
      <div className="page-wrapper">
        <Menu></Menu>
        <div className="page-container">
          <Header></Header>
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row m-t-25">
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c1">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-account-o"></i>
                          </div>
                          <div className="text">
                            <h2>$1,060,386</h2>
                            <span>total earnings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c2">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-shopping-cart"></i>
                          </div>
                          <div className="text">
                            <h2>$1,060,386</h2>
                            <span>total earnings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c3">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-calendar-note"></i>
                          </div>
                          <div className="text">
                            <h2>$1,060,386</h2>
                            <span>total earnings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c4">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-money"></i>
                          </div>
                          <div className="text">
                            <h2>$1,060,386</h2>
                            <span>total earnings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="au-card recent-report">
                      <div className="au-card-inner">
                        <h3 className="title-2">recent reports</h3>
                        <div className="chart-info">
                          <div className="chart-info__left">
                            <div className="chart-note">
                              <span className="dot dot--blue"></span>
                              <span>products</span>
                            </div>
                            <div className="chart-note mr-0">
                              <span className="dot dot--green"></span>
                              <span>services</span>
                            </div>
                          </div>
                          <div className="chart-info__right">
                            <div className="chart-statis">
                              <span className="index incre">
                                <i className="zmdi zmdi-long-arrow-up"></i>25%
                              </span>
                              <span className="label">products</span>
                            </div>
                            <div className="chart-statis mr-0">
                              <span className="index decre">
                                <i className="zmdi zmdi-long-arrow-down"></i>10%
                              </span>
                              <span className="label">services</span>
                            </div>
                          </div>
                        </div>
                        <div className="recent-report__chart">
                          <canvas id="recent-rep-chart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="au-card chart-percent-card">
                      <div className="au-card-inner">
                        <h3 className="title-2 tm-b-5">char by %</h3>
                        <div className="row no-gutters">
                          <div className="col-xl-6">
                            <div className="chart-note-wrap">
                              <div className="chart-note mr-0 d-block">
                                <span className="dot dot--blue"></span>
                                <span>products</span>
                              </div>
                              <div className="chart-note mr-0 d-block">
                                <span className="dot dot--red"></span>
                                <span>services</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="percent-chart">
                              <canvas id="percent-chart"></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongKe;

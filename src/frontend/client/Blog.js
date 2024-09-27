import Header from './layout/Header';
import Footer from './layout/Footer';
import { Link } from 'react-router-dom';

function Blog() {
    return (
        <div>
        <Header></Header>
            {/* Title page */}
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: "url('../../asset/images/bg-02.jpg')" }}>
                <h2 className="ltext-105 cl0 txt-center">
                    Bài viết
                </h2>
            </section>

            {/* Content page */}
            <section className="bg0 p-t-62 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-9 p-b-80">
                            <div className="p-r-45 p-r-0-lg">
                                {/* item blog */}
                                <div className="p-b-63">
                                    <Link to="blog-detail.html" className="hov-img0 how-pos5-parent">
                                        <img src="../../asset/images/blog-04.jpg" alt="IMG-BLOG" />

                                        <div className="flex-col-c-m size-123 bg9 how-pos5">
                                            <span className="ltext-107 cl2 txt-center">
                                                22
                                            </span>

                                            <span className="stext-109 cl3 txt-center">
                                                Jan 2018
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-t-32">
                                        <h4 className="p-b-15">
                                            <a href="blog-detail.html" className="ltext-108 cl2 hov-cl1 trans-04">
                                                8 Inspiring Ways to Wear Dresses in the Winter
                                            </a>
                                        </h4>

                                        <p className="stext-117 cl6">
                                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius.
                                        </p>

                                        <div className="flex-w flex-sb-m p-t-18">
                                            <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                                <span>
                                                    <span className="cl4">By</span> Admin
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                <span>
                                                    StreetStyle, Fashion, Couple
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                <span>
                                                    8 Comments
                                                </span>
                                            </span>

                                            <Link to="blog-detail.html" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                                                Continue Reading
                                                <i className="fa fa-long-arrow-right m-l-9"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* item blog */}
                                {/* Repeat blog structure for other items */}
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3 p-b-80">
                            <div className="side-menu">
                                <div className="bor17 of-hidden pos-relative">
                                    <input className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55" type="text" name="search" placeholder="Tìm kiếm" />

                                    <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                                        <i className="zmdi zmdi-search"></i>
                                    </button>
                                </div>

                                <div className="p-t-55">
                                    <h4 className="mtext-112 cl2 p-b-33">
                                        Danh mục
                                    </h4>

                                    <ul>
                                        <li className="bor18">
                                            <Link to="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                Thời trang
                                            </Link>
                                        </li>
                                        {/* Repeat for other categories */}
                                    </ul>
                                </div>

                                {/* Featured Products, Archive, and Tags */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default Blog;

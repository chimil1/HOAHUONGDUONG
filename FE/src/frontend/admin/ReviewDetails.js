import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewDetails } from '../actions/unitActions';
import { useParams } from "react-router-dom";


function ReviewDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const unitState = useSelector((state) => state.unit);

    useEffect(() => {
        dispatch(fetchReviewDetails(id));
    }, [dispatch, id]);

    const reviews = unitState.units;

    if (!reviews) {
        return <p>Không có dữ liệu Đánh giá.</p>;
    }

    if (unitState.loading) {
        return <p>Đang tải...</p>;
    }

    if (unitState.error) {
        return <p>Lỗi: {unitState.error}</p>;
    }

    return (
        <div className="page-wrapper">
            <Menu />
            <div className="page-container">
                <Header />
                <div className="main-content m-t-100">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-header">
                                            <div className="overview-wrap">
                                                <h2 className="title-5 m-b-35">Đánh Giá {reviews.id}</h2>
                                            </div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <table className="table table-data2">
                                                        <thead>
                                                            <tr>
                                                            <th>Mã sản phẩm</th>
                                                                <th>Số Sao</th>
                                                                <th>Comment</th>
                                                                <th>ID khách hàng</th>
                                                                <th>ID sản phẩm</th>
                                                                <th>ID Đơn hàng</th>
                                                                <th>Ngày</th>
                                                                <th>Ngày</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {reviews.map((review) => (
                                                                <tr key={review.id} className="tr-shadow">
                                                                    <td>{review.id}</td>
                                                                    <td>{review.rating}</td>
                                                                    <td>{review.comment || "Chưa có bình luận"}</td>
                                                                    <td>{review.user_id}</td>
                                                                    <td>{review.product_id}</td>
                                                                    <td>{review.order_id}</td>
                                                                    <td>{review.created_at}</td>
                                                                    <td>{review.updated_at}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <Footer />
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

export default ReviewDetail;
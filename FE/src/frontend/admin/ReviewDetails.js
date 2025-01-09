import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewDetails, lockCommentAction } from "../actions/unitActions";
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

function ReviewDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const unitState = useSelector((state) => state.unit);
    const [searchTerm, setSearchTerm] = useState("");
    const [lockedComments, setLockedComments] = useState(new Set()); 
    const [currentPage, setCurrentPage] = useState(1); 
    const reviewsPerPage = 10; 

    const lockComment = (idReview, id_cmt) => {
        dispatch(lockCommentAction(idReview, id_cmt));
        setLockedComments(prevState => new Set(prevState.add(id_cmt))); 
    };

    useEffect(() => {
        dispatch(fetchReviewDetails(id));
    }, [dispatch, id]);

    const reviews = Array.isArray(unitState.units) ? unitState.units : [];

    if (unitState.loading) {
        return <p>Đang tải...</p>;
    }

    if (unitState.error) {
        return <p>Lỗi: {unitState.error}</p>;
    }

    if (!reviews || reviews.length === 0) {
        return <p>Không có dữ liệu Đánh giá.</p>;
    }

    const filteredReviews = reviews.filter(
        (review) =>
            review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="page-wrapper">
            <Menu />
            <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="title-5 m-b-35">Đánh Giá {id}</h2>
                                        <div className="search-box" style={{ maxWidth: "300px" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm bình luận..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Mã Đánh giá</th>
                                                <th>Số sao</th>
                                                <th>Đánh giá</th>
                                                <th>Mã khách hàng</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày cập nhật</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentReviews.map((review) => (
                                                <tr key={review.id}>
                                                    <td>{review.id}</td>
                                                    <td>{review.rating}</td>
                                                    <td>
                                                       
                                                        {lockedComments.has(review.id)
                                                            ? "Bình luận đã khóa"
                                                            : review.comment || "Chưa có bình luận"}
                                                    </td>
                                                    <td>{review.user_id}</td>
                                                    <td>{review.product_id}</td>
                                                    <td>{review.order_id}</td>
                                                    <td>{formatDate(review.created_at)}</td>
                                                    <td>{formatDate(review.updated_at)}</td>
                                                    <td>
                                                        {review.status !== 1 ? (
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                onClick={() => lockComment(id, review.id)}
                                                            >
                                                                Khóa bình luận
                                                            </button>
                                                        ) : (
                                                            <span className="text-muted">Đã khóa</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="pagination-controls d-flex justify-content-center mt-3">
                                        <button
                                            className="btn btn-outline-dark mr-2"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}

                                        >
                                            Trước
                                        </button>
                                        <span className="mx-2">{`${currentPage} / ${totalPages}`}</span>
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}

                                        >
                                            Sau
                                        </button>
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
    );
}

export default ReviewDetail;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { vnpayReturn } from "../actions/unitActions";

const VNPayReturn = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Lấy tất cả các tham số từ URL
        const params = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });

        // Gửi tham số đến Redux action để xử lý
        if (Object.keys(params).length > 0) {
            dispatch(vnpayReturn(params));
        }
    }, [dispatch, searchParams]);

    return (
        <div>
            <h1>Đang xử lý thanh toán...</h1>
            <p>Bạn sẽ được thông báo khi xử lý xong.</p>
        </div>
    );
};

export default VNPayReturn;

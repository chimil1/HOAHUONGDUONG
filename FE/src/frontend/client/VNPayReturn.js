import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { vnpayReturn } from "../actions/unitActions";
import Loading from "./layout/Loading";

const VNPayReturn = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Lấy tất cả các tham số từ URL
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // Gửi tham số đến Redux action để xử lý và truyền navigate vào
    if (Object.keys(params).length > 0) {
      dispatch(vnpayReturn(params, navigate)); // Pass navigate as argument
    }
  }, [dispatch, searchParams, navigate]); // Include navigate in the dependencies

  return <Loading />; // Show a loading indicator while processing
};

export default VNPayReturn;

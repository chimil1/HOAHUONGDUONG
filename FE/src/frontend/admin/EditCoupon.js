import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { fetchCouponDetails ,updateCoupon} from "../actions/couponAction";

function EditCoupon() {

    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const unitState = useSelector((state) => state.unit);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues,
    } = useForm();
  
    useEffect(() => {
      dispatch(fetchCouponDetails(id)); // Sử dụng action lấy chi tiết sản phẩm
    }, [dispatch, id]);
  
    useEffect(() => {
      console.log("Unit State:", unitState.selectedUnit);
      if (unitState.selectedUnit) {
        // Sử dụng selectedUnit
        setValue("name_coupon", unitState.selectedUnit.name_coupon);
        setValue("code_name", unitState.selectedUnit.code_name);
        setValue("discount_type", unitState.selectedUnit.discount_type);
        setValue("discount_value", unitState.selectedUnit.discount_value);
        setValue("minium_order_value", unitState.selectedUnit.minium_order_value);
        setValue("start_date", unitState.selectedUnit.start_date);
        setValue("end_date", unitState.selectedUnit.end_date);
      
      }
    }, [unitState.selectedUnit, setValue]);
  
    if (unitState.loading) {
      return <p>Loading...</p>;
    }
  
    if (unitState.error) {
      return <p>Error: {unitState.error}</p>;
    }
  
    const submit = (data) => {
      const jsonData = {
        name_coupon: data.name_coupon,
        code_name: data.code_name,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
        minium_order_value: data.minium_order_value,
        start_date: data.start_date,
        end_date: data.end_date,
      };
    
 
   
      try {
        dispatch(updateCoupon(id, jsonData));   // Sử dụng JSON thay vì FormData  // Đợi API hoàn thành
        Swal.fire({
          text: "Cập nhật mã giảm giá thành công!",
          icon: "success",
        });
        navigate("/coupon");
      } catch (error) {
        Swal.fire({
          text: "Có lỗi xảy ra khi cập nhật mã giảm giá!",
          icon: "error",
        });
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
                  <h3 className="title-5 m-b-35">Sửa mã giảm giá</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                      <label htmlFor="name_coupon">Tên mã giảm giá</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_coupon"
                        placeholder="Nhập mã giảm giá"
                        {...register("name_coupon", { required: "Vui lòng nhập tên mã giảm giá" })}
                      />
                      {errors.name_coupon && <p className="text-danger">{errors.name_coupon.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="code_name">Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code_name"
                        placeholder="Nhập code"
                        {...register("code_name", { required: "Vui lòng nhập code" })}
                      />
                      {errors.code_name && <p className="text-danger">{errors.code_name.message}</p>}
                    </div>

                    <div className="form-group">
                      <label>Loại giảm giá</label>
                      <select
                        className="form-control"
                        id="discount_type"
                        {...register("discount_type", { required: "Vui lòng chọn loại giảm giá" })}
                      >
                        <option value="">Chọn giảm giá</option>
                        <option value="0">VNĐ</option>
                        <option value="1">%</option>
                      </select>
                      {errors.discount_type && <p className="text-danger">{errors.discount_type.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="discount_value">Giá trị giảm giá</label>
                      <input
                        type="number"
                        className="form-control"
                        id="discount_value"
                        placeholder="Nhập giá trị giảm giá"
                        {...register("discount_value", {
                          required: "Vui lòng nhập giá trị giảm giá",
                          min: { value: 1, message: "Giá trị giảm giá phải lớn hơn 0" }
                        })}
                      />
                      {errors.discount_value && <p className="text-danger">{errors.discount_value.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="minium_order_value">Giá tối thiểu</label>
                      <input
                        type="number"
                        className="form-control"
                        id="minium_order_value"
                        placeholder="Nhập giá tối thiểu"
                        {...register("minium_order_value", {
                          required: "Vui lòng nhập giá tối thiểu",
                          min: { value: 0, message: "Giá tối thiểu phải lớn hơn hoặc bằng 0" }
                        })}
                      />
                      {errors.minium_order_value && <p className="text-danger">{errors.minium_order_value.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="start_date">Ngày bắt đầu</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="start_date"
                        {...register("start_date", { required: "Vui lòng chọn ngày bắt đầu" })}
                      />
                      {errors.start_date && <p className="text-danger">{errors.start_date.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="end_date">Ngày kết thúc</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="end_date"
                        {...register("end_date", { required: "Vui lòng chọn ngày kết thúc" })}
                      />
                      {errors.end_date && <p className="text-danger">{errors.end_date.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-dark">
                      <i className="zmdi zmdi-plus"></i> Sửa
                    </button>
                  </form>
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

export default EditCoupon;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { fetchUser, fetchAddAddress } from "../actions/unitActions";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import axios from "axios";
import { Link } from "react-router-dom";

function AddShipping() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userState = useSelector((state) => state.unit);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    // Fetch the list of cities
    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/p/")
            .then(response => {
                const sortedCities = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setCities(sortedCities);
            })
            .catch(error => console.error("Error fetching cities:", error));
    }, []);

    // Handle city selection and fetch districts
    const handleCityChange = async (e) => {
        const cityCode = e.target.value;
        const cityName = e.target.options[e.target.selectedIndex].text;
        setSelectedCity(cityCode);
        setSelectedCityName(cityName);

        if (cityCode) {
            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
                if (response.status === 200) {
                    const sortedDistricts = response.data.districts.sort((a, b) => a.name.localeCompare(b.name));
                    setDistricts(sortedDistricts);
                    setSelectedDistrict("");
                    setSelectedDistrictName("");
                    setWards([]);
                    setSelectedWard("");
                }
            } catch (error) {
                console.error("Error fetching districts:", error);
                Swal.fire({
                    text: "Không thể lấy danh sách quận/huyện.",
                    icon: "error",
                });
            }
        } else {
            setDistricts([]);
            setWards([]);
            setSelectedWard("");
        }
    };

    // Handle district selection and fetch wards
    const handleDistrictChange = async (e) => {
        const districtCode = e.target.value;
        const districtName = e.target.options[e.target.selectedIndex].text;
        setSelectedDistrict(districtCode);
        setSelectedDistrictName(districtName);

        if (districtCode) {
            try {
                const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
                if (response.status === 200) {
                    const sortedWards = response.data.wards.sort((a, b) => a.name.localeCompare(b.name));
                    setWards(sortedWards);
                }
            } catch (error) {
                console.error("Error fetching wards:", error);
                Swal.fire({
                    text: "Không thể lấy danh sách phường/xã.",
                    icon: "error",
                });
            }
        } else {
            setWards([]);
            setSelectedWard("");
        }
    };

    // Handle ward selection
    const handleWardChange = (e) => {
        const wardName = e.target.value;
        setSelectedWard(wardName);
    };

    // Fetch user information
    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    // Handle form submission
    const submit = async (data) => {
        const jsonData = {
            shipping_name: data.shipping_name,
            shipping_phone: data.shipping_phone,
            shipping_address: `${data.street_address}, ${selectedWard}, ${selectedDistrictName}, ${selectedCityName}`,
        };

        try {
            await dispatch(fetchAddAddress(id, jsonData));
            Swal.fire({
                text: "Thêm địa chỉ thành công!",
                icon: "success",
            }).then(() => {
                navigate(`/listaddress/${id}`);
            });
        } catch (error) {
            console.error("Error adding address:", error);
            Swal.fire({
                text: error?.response?.data?.message || "Có lỗi xảy ra khi thêm địa chỉ!",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <Header />
            <section className="pt-5" style={{backgroundColor: "#f8f9fa"}}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body text-center">
                                    <img
                                        src="../../asset/images/avatar.jpg"
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{width: "150px"}}
                                    />
                                    <div>
                                        {userState.user && (
                                            <div>
                                                <h5 className="my-3">{userState.user.name}</h5>
                                                <p className="text-dark ">{userState.user.email}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <Link to={`/listaddress/${id}`} style={{ color: "black", textDecoration: "none" }}>
                                        Quay lại
                                    </Link>
                                    <h5 className="text-center text-muted mb-4">Thêm Địa Chỉ</h5>
                                    <form onSubmit={handleSubmit(submit)}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label ">Họ Tên</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên người nhận"
                                                    {...register("shipping_name", {required: "Họ tên là bắt buộc"})}
                                                />
                                                {errors.shipping_name && (
                                                    <p className="text-danger">{errors.shipping_name.message}</p>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Số Điện Thoại</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    {...register("shipping_phone", {
                                                        required: "Số điện thoại là bắt buộc",
                                                        pattern: {
                                                            value: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
                                                            message: "Số điện thoại không hợp lệ"
                                                        }
                                                    })}
                                                />
                                                {errors.shipping_phone && (
                                                    <p className="text-danger">{errors.shipping_phone.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-4">
                                                <label className="form-label">Thành Phố</label>
                                                <select
                                                    className="form-select"
                                                    {...register("city", {required: "Thành phố là bắt buộc"})}
                                                    value={selectedCity}
                                                    onChange={handleCityChange}
                                                >
                                                    <option value="">Chọn Thành Phố</option>
                                                    {cities.map((city) => (
                                                        <option key={city.code} value={city.code}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Quận/Huyện</label>
                                                <select
                                                    className="form-select"
                                                    {...register("district", {required: "Quận/Huyện là bắt buộc"})}
                                                    value={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    disabled={!selectedCity}
                                                >
                                                    <option value="">Chọn Quận/Huyện</option>
                                                    {districts.map((district) => (
                                                        <option key={district.code} value={district.code}>
                                                            {district.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.district && <p className="text-danger">{errors.district.message}</p>}
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label">Phường/Xã</label>
                                                <select
                                                    className="form-select"
                                                    {...register("ward", {required: "Phường/Xã là bắt buộc"})}
                                                    value={selectedWard}
                                                    onChange={handleWardChange}
                                                    disabled={!selectedDistrict}
                                                >
                                                    <option value="">Chọn Phường/Xã</option>
                                                    {wards.map((ward) => (
                                                        <option key={ward.code} value={ward.name}>
                                                            {ward.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.ward && <p className="text-danger">{errors.ward.message}</p>}
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Địa Chỉ Củ Thể</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Địa Chỉ Củ Thể"
                                                    {...register("street_address", {required: "Địa chỉ là bắt buộc"})}
                                                />
                                                {errors.street_address && (
                                                    <p className="text-danger">{errors.street_address.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-outline-dark w-100 py-2">Thêm Địa Chỉ</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AddShipping;

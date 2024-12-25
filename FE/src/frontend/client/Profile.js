  import React, { useEffect, useState } from "react";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import Header from "./layout/Header";
  import Footer from "./layout/Footer";
  import { useSelector, useDispatch } from "react-redux";
  import {
    fetchAddAddress,
    fetchAddresses,
    fetchShippingDelete,
    fetchUser,
    updateUser
  } from "../actions/unitActions";
  // import { useForm } from "react-hook-form";
  import Swal from "sweetalert2";
  import axios from "axios";

  function Profile() {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const address = useForm();
    const password = useForm();

    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userId, setUserId] = useState(null);

    const userState = useSelector((state) => state.unit);
    const addressState = useSelector((state) => state.address);

    const navigate = useNavigate();
    const itemsPerPage = 6; // Đặt số lượng địa chỉ mỗi trang
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      if (token) {
        setIsLoggedIn(true);
        setUserId(userId);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    }, []);
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserId(null);
      navigate("/login");
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeTab, setActiveTab] = useState("address");  // Giả sử tab mặc định là "address"

    useEffect(() => {
      dispatch(fetchUser(id));
      dispatch(fetchAddresses());
    }, [dispatch, id]);

    // ADDRESS
    // Thêm Địa chỉ


    // Danh sách address
    const addresses = Array.isArray(addressState.units) ? addressState.units : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentAddresses = addresses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(addresses.length / itemsPerPage);
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
      axios.get("https://provinces.open-api.vn/api/p/")
          .then(response => {
            const sortedCities = response.data.sort((a, b) => a.name.localeCompare(b.name));
            setCities(sortedCities);
          })
          .catch(error => console.error("Error fetching cities:", error));
    }, []);
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

    const handleWardChange = (e) => {
      const wardName = e.target.value;
      setSelectedWard(wardName);
    };

    const submitAddress = async (data) => {
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
            window.location.reload();
        });
      } catch (error) {
        console.error("Error adding address:", error); // Log lỗi chi tiết
        Swal.fire({
          text: error?.response?.data?.message || "Có lỗi xảy ra khi thêm địa chỉ!",
          icon: "error",
        });
      }
    };

    const handleDelete = (addressId) => {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa địa chỉ này?',
        text: "Địa chỉ này sẽ không thể khôi phục!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(fetchShippingDelete(addressId));  // Xóa địa chỉ
          Swal.fire({
            text: "Xóa địa chỉ thành công!",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      });
    };




    // USER
    if (userState.loading) {
      return <p>Loading...</p>;
    }

    if (userState.error) {
      return <p>Error: {userState.error}</p>;
    }

    const user = userState.user;

    if (!user) {
      return <p>No user data available.</p>;
    }

    const submit = (data, event) => {
      event.preventDefault();
      if (newPassword !== confirmPassword) {
        Swal.fire({
          text: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
          icon: "error",
        });
        return;
      }

      const jsonData = {
        password: data.newPassword,
        oldPw: data.oldPassword,
      };

      try {
        dispatch(updateUser(id, jsonData));
        Swal.fire({
          text: "Đổi mật khẩu thành công!",
          icon: "success",
        });
        navigate(`/profile/${id}`);
      } catch (error) {
        Swal.fire({
          text: "Có lỗi xảy ra khi đổi mật khẩu!",
          icon: "error",
        });
      }

    };

    return (
        <div>
          <Header />
          <section className="pt-5" style={{ backgroundColor: "#eee" }}>
            <div className="container-xxl py-5">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <Link
                      className="nav-link active text-dark"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      to="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="true"
                  >
                    Thông tin người dùng
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                      type="button"
                      className="nav-link text-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#examppass"
                  >
                    Đổi mật khẩu
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                      className="nav-link text-dark"
                      id="address-tab"
                      data-bs-toggle="tab"
                      href="#address"
                      role="tab"
                      aria-controls="address"
                      aria-selected="false"
                  >
                    Địa chỉ giao hàng
                  </a>
                </li>
                <li className="nav-item" >
                <Link
                    className="nav-link text-dark"
                    to={`/Order/${userId}`}
                >
                  Đơn hàng
                </Link>
              </li>
              </ul>
              <div className="tab-content mt-4" id="myTabContent">
                <div className="tab-pane fade show active" id="address-tab" role="tabpanel" aria-labelledby="profile-tab">

                </div>
              </div>
              <div className="tab-content mt-4" id="myTabContent">
                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card mb-4">
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
                                  <h5 className="my-3 text-dark">{userState.user.name}</h5>
                                  <p className="text-dark mb-1">{userState.user.email}</p>
                                </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card mb-4">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0 text-dark fw-bold">Họ và tên:</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-dark mb-0" style={{textTransform: 'capitalize'}}>{user.name}</p>
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0 text-dark fw-bold">Email:</p>
                            </div>
                            <div className="col-sm-8">
                              <p className="text-dark mb-0">{user.email}</p>
                            </div>
                          </div>
                          <hr/>
                          <div className="row">
                            <div className="col-sm-3">
                              <p className="mb-0 text-dark fw-bold">Số điện thoại:</p>
                            </div>
                            <div className="col-sm-9">
                              <p className="text-dark mb-0 ">{user.phone}</p>
                            </div>
                          </div>
                          <hr/>
                          <div className="mt-5">
                            <form action="" method="post">
                              <button className="btn btn-outline-dark me-2" onClick={handleLogout}>
                                Đăng Xuất
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                  <div className="container-xxl py-2">
                    <div className="container-xxl py-1">
                      <div className="row g-4">
                        <div className="col-lg-12">
                          <div className="card shadow border-0">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="text-dark">Danh sách địa chỉ giao hàng</h4>
                                <button
                                    type="button"
                                    className="btn btn-outline-dark"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addAddressModal"
                                >
                                  Thêm địa chỉ
                                </button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-bordered table-striped align-middle text-center">
                                  <thead className="table-light">
                                  <tr>
                                    <th>#</th>
                                    <th className={"text-center text-nowrap"}>Tên người nhận</th>
                                    <th className={"text-center text-nowrap"}>Địa chỉ cụ thể</th>
                                    <th className={"text-center text-nowrap"}>Địa chỉ</th>
                                    <th className={"text-center text-nowrap"}>Số điện thoại</th>
                                    <th className={"text-center text-nowrap"}>Hành động</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {addressState.addresses.map((item, index) => {
                                    const shippingAddress = item.shipping_address?.split(",") || [];
                                    const specificAddress = shippingAddress[0]?.trim() || "N/A";
                                    const fullAddress = shippingAddress.slice(1).join(",") || "N/A";
                                    return (
                                        <tr key={item.id}>
                                          <td>{index + 1}</td>
                                          <td style={{textTransform: "capitalize"}}>{item.shipping_name}</td>
                                          <td>{specificAddress}</td>
                                          <td>{fullAddress}</td>
                                          <td>{item.shipping_phone}</td>
                                          <td>
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(item.id)}>
                                              Xóa
                                            </button>
                                          </td>
                                        </tr>
                                    );
                                  })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal fade" id="addAddressModal" tabIndex="-1"
                           aria-labelledby="addAddressModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="addAddressModalLabel">Thêm địa chỉ</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={address.handleSubmit(submitAddress)}>
                                <div className="mb-3">
                                  <label className="form-label">Họ tên</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Nhập tên người nhận"
                                      {...address.register("shipping_name", {required: "Họ tên là bắt buộc"})}
                                  />
                                  {address.formState.errors.shipping_name &&
                                      <p className="text-danger">{address.formState.errors.shipping_name.message}</p>}
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Số điện thoại</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Nhập số điện thoại"
                                      {...address.register("shipping_phone", {
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: {
                                          value: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
                                          message: "Số điện thoại không hợp lệ"
                                        },
                                      })}
                                  />
                                  {address.formState.errors.shipping_phone &&
                                      <p className="text-danger">{address.formState.errors.shipping_phone.message}</p>}
                                </div>
                                <div className="row g-3 mb-3">
                                  <div className="col-md-4">
                                    <label className="form-label">Thành phố</label>
                                    <select
                                        className="form-select"
                                        {...address.register("city", {required: "Thành phố là bắt buộc"})}
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                    >
                                      <option value="">Chọn thành phố</option>
                                      {cities.map((city) => (
                                          <option key={city.code} value={city.code}>
                                            {city.name}
                                          </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">Quận/Huyện</label>
                                    <select
                                        className="form-select"
                                        {...address.register("district", {required: "Quận/Huyện là bắt buộc"})}
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
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">Phường/Xã</label>
                                    <select
                                        className="form-select"
                                        {...address.register("ward", {required: "Phường/Xã là bắt buộc"})}
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
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Địa chỉ cụ thể</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Nhập địa chỉ cụ thể"
                                      {...address.register("street_address", {required: "Địa chỉ là bắt buộc"})}
                                  />
                                  {address.formState.errors.street_address &&
                                      <p className="text-danger">{address.formState.errors.street_address.message}</p>}
                                </div>
                                <button type="submit" className="btn btn-outline-dark w-100">Thêm Địa Chỉ</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modal đổi mật khẩu */}
          <form onSubmit={(e) => password.handleSubmit((data) => submit(data, e))(e)}>
            <div
                className="modal fade"
                id="examppass"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Đổi Mật Khẩu
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Mật khẩu cũ</label>
                      <input
                          {...password.register("oldPassword", {required: "Mật khẩu cũ là bắt buộc"})}
                          type="password"
                          className="form-control"
                      />
                      {password.formState.errors.oldPassword &&
                          <p className="text-danger">{password.formState.errors.oldPassword.message}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mật khẩu mới</label>
                      <input
                          {...password.register("newPassword", {required: "Mật khẩu mới là bắt buộc"})}
                          type="password"
                          className="form-control"
                      />
                      {password.formState.errors.newPassword &&
                          <p className="text-danger">{password.formState.errors.newPassword.message}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nhập lại mật khẩu mới</label>
                      <input
                          {...password.register("confirmPassword", {required: "Xác nhận mật khẩu là bắt buộc"})}
                          type="password"
                          className="form-control"
                      />
                      {password.formState.errors.confirmPassword &&
                          <p className="text-danger">{password.formState.errors.confirmPassword.message}</p>}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Đóng
                    </button>
                    <button type="submit" className="btn btn-outline-dark">
                      Đồng ý
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Footer/>
        </div>
    );
  }

  export default Profile;

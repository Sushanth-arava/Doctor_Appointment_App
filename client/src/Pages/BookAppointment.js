import { Button, Col, DatePicker, TimePicker, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./../App.css";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/reducers/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

function BookAppointment() {
  // const onChange = (date) => {
  //   console.log(date.format("DD-MM-YYYY"));
  // };
  // const onChange2 = (time) => {
  //   console.log(time.format("HH:mm"));
  // };
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const handleDate = (date) => {
    const formattedDate = date ? dayjs(date).format("DD-MM-YYYY") : null;
    setDate(formattedDate);
    console.log(formattedDate);
  };
  const handleTime = (time, timeStirng) => {
    const formattedTime = time ? dayjs(time).format("HH:mm") : null;
    setTime(formattedTime);
    console.log(formattedTime);
  };
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Consultation Fee : </b>
                {doctor.consultationFee}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker format="DD-MM-YYYY" onChange={handleDate} />
                <div></div>
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  showNow={false}
                  onChange={handleTime}
                />
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;

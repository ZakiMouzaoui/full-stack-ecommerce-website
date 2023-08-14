import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SubTitle from "../utils/SubTitle";
import ViewUserProfileHook from "../../hook/user/view_user_profile_hook";
import { useState } from "react";
import EditUserProfileHook from "../../hook/user/edit_user_profile_hook";
import { ToastContainer } from "react-toastify";
import ChnagePasswordHook from "../../hook/user/change_password_hook";

const UserProfile = () => {
  const { user } = ViewUserProfileHook();
  const [showModal, setShowModal] = useState(false);

  const {
    name,
    onNameChange,
    phone,
    onPhoneChange,
    onSubmit,
    resetForm,
    loading,
  } = EditUserProfileHook(user);

  const {
    oldPwd,
    onOldPwdChange,
    pwd,
    onPwdChange,
    Pwd2,
    onPwd2Change,
    onPwdSubmit,
  } = ChnagePasswordHook();

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Edit my account{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center d-flex justify-content-start"
          style={{ flexDirection: "column" }}
        >
          <div className="text-form text-dark text-start mb-1"> Name</div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={onNameChange}
            className="input-form-area p-2 mb-3"
            value={name}
          />

          <div className="text-form text-dark text-start mb-1"> Phone</div>
          <input
            type="tel"
            placeholder="+2130599999999"
            onChange={onPhoneChange}
            className="input-form-area p-2 mb-3"
            value={phone}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmit}>
            {loading === true ? (
              <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col lg={7}>
          <SubTitle title="Account"></SubTitle>
          <div className="d-flex justify-content-between bg-white p-3 rounded shadow-sm">
            <div>
              <p>
                <b>Name: </b>
                {user && user.name}
              </p>
              <p>
                <b>Phone: </b>
                {user && user.phone}
              </p>
              <p>
                <b>Email: </b>
                {user && user.email}
              </p>
            </div>

            <div>
              <i
                className="fa fa-edit"
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                {" "}
              </i>
            </div>
          </div>
        </Col>

        <Col>
          <SubTitle title="Change password"></SubTitle>
          <form
            onSubmit={onPwdSubmit}
            className="d-flex flex-column"
            style={{ flexWrap: "nowrap" }}
          >
            <input
              type="password"
              className="user-input p-3 mb-3 w-100"
              placeholder="Enter your old password"
              id="old-pwd"
              value={oldPwd}
              onChange={onOldPwdChange}
            ></input>
            <input
              type="password"
              className="user-input  p-3 mb-3 w-100"
              placeholder="Enter your new password"
              id="new-pwd"
              value={pwd}
              onChange={onPwdChange}
            ></input>
            <input
              type="password"
              className="user-input  p-3 mb-3 w-100"
              placeholder="Re-enter your new password"
              id="new-pwd2"
              value={Pwd2}
              onChange={onPwd2Change}
            ></input>
            <button type="submit" className="btn-login mb-3 w-100">
              Change
            </button>
          </form>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default UserProfile;

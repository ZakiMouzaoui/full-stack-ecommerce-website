import { Badge, Button, Modal, Spinner } from "react-bootstrap";
import DeleteAddressHook from "../../hook/user/delete_address_hook";
import EditAddressHook from "../../hook/user/edit_address_hook";
import { useSelector } from "react-redux";

const AddressCard = ({ address }) => {
  const shippingAddress = useSelector((state) => state.Address.shippingAddress);
  const { loadingDel, showModalDel, setShowModalDel, onSubmitDel } =
    DeleteAddressHook(address);

  const deleteModal = () => {
    setShowModalDel(true);
  };

  const handleCloseDel = () => {
    setShowModalDel(false);
  };

  const handleEditClose = () => {
    setShowModal(false);
    resetForm();
  };

  const {
    loading,
    showModal,
    setShowModal,
    city,
    onCityChange,
    details,
    onDetailsChange,
    street,
    onStreetChange,
    postalCode,
    onPostalCodeChange,
    phone,
    onPhoneChange,
    onCheck,
    onSubmit,
    resetForm,
  } = EditAddressHook(address);

  return (
    <>
      <Modal show={showModalDel} onHide={handleCloseDel}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Confirm your action{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>Are you sure you want to delete this address?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onSubmitDel}>
            {loadingDel === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleEditClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Edit your address{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex" style={{ flexDirection: "column" }}>
          <div className="text-form text-dark text-start mb-1">City</div>
          <input
            type="text"
            placeholder="City..."
            onChange={onCityChange}
            className="user-input w-100 mb-3 p-2"
            value={city}
          />

          <div className="text-form text-dark text-start mb-1">Street</div>
          <input
            type="text"
            placeholder="Street..."
            onChange={onStreetChange}
            className="user-input w-100 mb-3 p-2"
            value={street}
          />

          <div className="text-form text-dark text-start mb-1">Details</div>
          <input
            type="text"
            placeholder="Details..."
            onChange={onDetailsChange}
            className="user-input w-100 mb-3 p-2"
            value={details}
          />

          <div className="text-form text-dark text-start mb-1">Postal Code</div>
          <input
            type="text"
            placeholder="31000"
            onChange={onPostalCodeChange}
            className="user-input w-100 mb-3 p-2"
            value={postalCode}
          />

          <div className="text-form text-dark text-start mb-1">Phone</div>
          <input
            type="text"
            placeholder="+213558405601"
            onChange={onPhoneChange}
            className="user-input w-100 mb-3 p-2"
            value={phone}
          />
          {shippingAddress !== address._id && (
            <div className="d-flex align-items-baseline">
              <div>
                <input
                  type="checkbox"
                  className="mb-3 me-2 p-2"
                  onChange={onCheck}
                />
              </div>
              <div className="text-form text-dark text-start mb-1">
                Set as shipping address
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmit}>
            {(loading === true) === true ? (
              <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-between bg-white p-3 rounded shadow-sm mb-2">
        <div>
          <p>
            <b>City: </b>
            {address.city}
          </p>
          <p>
            <b>Street: </b>
            {address.street}
          </p>
          <p>
            <b>Details: </b>
            {address.details}
          </p>
          <p>
            <b>Postal Code: </b>
            {address.postalCode}
          </p>
          <p>
            <b>Phone: </b>
            {address.phone}
          </p>
          {shippingAddress === address._id && (
            <Badge
              bg="dark"
              bsPrefix="badge-address"
              style={{ padding: "1em", fontSize: "0.6rem", color: "white" }}
            >
              Default Address
            </Badge>
          )}
        </div>
        <div>
          <div>
            <i
              className="fa fa-edit"
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            ></i>{" "}
            <i
              className="fa fa-trash ms-2"
              style={{ color: "red", cursor: "pointer" }}
              onClick={deleteModal}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;

import AddressCard from "./AddressCard";
import ViewUserAddressesHook from "../../hook/user/view_user_addresses_hook";
import AdminSubTitle from "../admin/AdminSubtitle";
import AddAddressHook from "../../hook/user/add_address_hook";
import { Button, Modal, Spinner } from "react-bootstrap";
import EmptyWishlist from "../error/EmptyWishlist";
import NoDocumentFound from "../error/NoDocumentFound";

const UserAddress = () => {
  const { addresses, loading: fetchLoading } = ViewUserAddressesHook();
  const {
    loading,
    showModal,
    setShowModal,
    onCityChange,
    onDetailsChange,
    onStreetChange,
    onPostalCodeChange,
    onPhoneChange,
    onSubmit,
    resetForm,
  } = AddAddressHook();

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
              Add a new address{" "}
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
          />

          <div className="text-form text-dark text-start mb-1">Street</div>
          <input
            type="text"
            placeholder="Street..."
            onChange={onStreetChange}
            className="user-input w-100 mb-3 p-2"
          />

          <div className="text-form text-dark text-start mb-1">Details</div>
          <input
            type="text"
            placeholder="Details..."
            onChange={onDetailsChange}
            className="user-input w-100 mb-3 p-2"
          />

          <div className="text-form text-dark text-start mb-1">Postal Code</div>
          <input
            type="text"
            placeholder="31000"
            onChange={onPostalCodeChange}
            className="user-input w-100 mb-3 p-2"
          />

          <div className="text-form text-dark text-start mb-1">Phone</div>
          <input
            type="text"
            placeholder="+213558405601"
            onChange={onPhoneChange}
            className="user-input w-100 mb-3 p-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
      <AdminSubTitle
        search={null}
        title="My Addresses"
        onAddClick={() => {
          setShowModal(true);
        }}
        showSearch={false}
      ></AdminSubTitle>
      {addresses ? (
        addresses.length > 0 ? (
          addresses.map((address, index) => {
            return <AddressCard address={address} key={index}></AddressCard>;
          })
        ) : fetchLoading === true ? (
          <Spinner></Spinner>
        ) : (
          <EmptyWishlist></EmptyWishlist>
        )
      ) : (
        <NoDocumentFound></NoDocumentFound>
      )}
    </>
  );
};

export default UserAddress;

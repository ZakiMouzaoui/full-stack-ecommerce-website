import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import AdminAllProductsHook from "../../hook/admin/view_admin_products_hook";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import AddProductHook from "../../hook/product/add_product_hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteProductHook from "../../hook/product/delete_product_hook";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, GET_PRODUCT } from "../../redux/type";
import { Rating } from "primereact/rating";
import MultiImageInput from "react-multiple-image-input";
import Multiselect from "multiselect-react-dropdown";
import { CompactPicker } from "react-color";
import EditProductHook from "../../hook/product/edit_product_hook";
import NavBarLogin from "../../components/utils/NavBarLogin";

const AdminAllProductsPage = () => {
  const dispatch = useDispatch();

  const [loading, products, filtered, isServerError] = AdminAllProductsHook();
  const categories = useSelector((state) => state.Category.categories);
  const subcategories = useSelector((state) => state.SubCategory.subcategories);
  const brands = useSelector((state) => state.Brand.brands);

  const [
    addLoading,
    images,
    setImages,
    onNameChange,
    onDescChange,
    onPriceBeforChange,
    onPriceAfterChange,
    onQtyChange,
    onCategoryChange,
    onSubCatSelect,
    onRemoveSubCat,
    selectedSubCatIds,
    onBrandChange,
    showColors,
    setShowColors,
    onColorChange,
    removeColor,
    colors,
    onSubmit,
    resetForm,
    showAddModal,
    setShowAddModal,
  ] = AddProductHook();

  const [
    deleteLoading,
    isDeletePressed,
    onDeleteConfirm,
    showDeleteModal,
    setDeleteShowModal,
  ] = DeleteProductHook();

  const product = useSelector((state) => state.Product.product);

  const [
    editLoading,
    editImages,
    setEditImages,
    name,
    onEditNameChange,
    desc,
    onEditDescChange,
    priceBefore,
    onEditPriceBeforChange,
    priceAfter,
    onEditPriceAfterChange,
    qty,
    onEditQtyChange,
    onEditCategoryChange,
    subcategoriesEditSelected,
    onEditSubCatSelect,
    onEditRemoveSubCat,
    onEditBrandChange,
    showEditColors,
    setShowEditColors,
    onEditColorChange,
    removeEditColor,
    editColors,
    onEdit,
    resetEditForm,
    showEditModal,
    setShowEditModal,
    loadingModal,
  ] = EditProductHook(product);

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];

    if (searchTerm) {
      filteredData = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...products];
    }
    dispatch({
      type: FILTER_PRODUCTS,
      filtered: filteredData,
    });
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditModal = (productObj) => {
    dispatch({
      type: GET_PRODUCT,
      product: productObj,
    });
    setShowEditModal(true);
  };

  const handleDeleteModal = (productObj) => {
    dispatch({
      type: GET_PRODUCT,
      product: productObj,
    });
    setDeleteShowModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteClose = () => {
    setDeleteShowModal(false);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    resetEditForm();
  };

  const imageCard = (product) => {
    return (
      <img
        src={`http://127.0.0.1:8000/products/${product.images[0]}`}
        alt={product.image}
        className="shadow-2 border-round"
        style={{ width: "50px", height: "50px" }}
      />
    );
  };

  // const colorsBody = (product) => {
  //   return (
  //     <Row className="px-1">
  //       {product.colors.map((color) => {
  //         return (
  //           <Col className="mb-1">
  //             <div
  //               style={{
  //                 backgroundColor: color,
  //                 height: "20px",
  //                 width: "20px",
  //                 borderRadius: "50%",
  //                 boxShadow: "1px 2px 1px 1px rgba(0, 0, 0, 0.15) ",
  //               }}
  //             ></div>
  //           </Col>
  //         );
  //       })}
  //     </Row>
  //   );
  // };

  return (
    <div style={{ minHeight: "600px" }}>
      <NavBarLogin></NavBarLogin>
      {/* START OF ADD MODAL */}
      {products && (
        <Modal show={showAddModal} onHide={handleAddClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>
                Add a new product{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="" style={{ flexDirection: "column" }}>
            <div className="d-flex flex-column">
              <div className="text-form pb-2 text-dark text-start"> Images</div>

              <label for="upload-photo">
                <MultiImageInput
                  images={images}
                  setImages={setImages}
                  theme={"light"}
                  allowCrop={false}
                  max={4}
                />
              </label>
              <input type="file" name="image" id="upload-photo" />
            </div>

            <div className="text-form text-dark text-start mb-1"> Name</div>
            <input
              type="text"
              placeholder="Product name here"
              onChange={onNameChange}
              className="input-form-area p-2 mb-3"
            />
            <div className="text-form text-dark text-start mb-1">
              {" "}
              Description
            </div>
            <textarea
              className="input-form-area p-2 mb-2"
              rows="4"
              cols="5"
              placeholder="Product description here"
              style={{ resize: "none", height: "100px" }}
              onChange={onDescChange}
            />
            <div className="d-flex mb-3 justify-content-between">
              <div>
                <div className="text-form text-dark text-start mb-1">
                  Price before discount
                </div>
                <input
                  type="number"
                  placeholder="499.99"
                  className="input-form-area d-block px-2"
                  onChange={onPriceBeforChange}
                />
              </div>
              <div>
                <div className="text-form text-dark text-start mb-1">
                  Price after discount <small>(optional)</small>
                </div>
                <input
                  type="number"
                  placeholder="400.99"
                  className="input-form-area d-block px-2"
                  onChange={onPriceAfterChange}
                />
              </div>
            </div>
            <div className="text-form text-dark text-start mb-1">Quantity</div>
            <input
              type="number"
              placeholder="5"
              className="input-form-area d-block mb-3 px-2"
              onChange={onQtyChange}
            />

            <div className="text-form text-dark text-start mb-1">Category</div>
            <select
              className="user-input w-100 mb-3 p-2"
              placeholder="Select"
              name="category"
              onChange={onCategoryChange}
            >
              <option value={0}>Select a category</option>
              {categories.map((category) => {
                return <option value={category._id}>{category.name}</option>;
              })}
            </select>

            <div className="text-form text-dark text-start mb-1">
              SubCategories
            </div>
            <Multiselect
              options={subcategories || []}
              onRemove={onRemoveSubCat}
              onSelect={onSubCatSelect}
              displayValue="name"
              selectedValues={selectedSubCatIds}
              emptyRecordMsg="Select a category first"
              className="mb-3"
            ></Multiselect>

            <div className="text-form text-dark text-start mb-1">Brand</div>
            <select
              className="user-input w-100 mb-3 p-2"
              name="brand"
              onChange={onBrandChange}
            >
              <option value={null}>Select a brand</option>
              {brands.map((brand) => {
                return <option value={brand._id}>{brand.name}</option>;
              })}
            </select>
            <div className="text-form text-dark text-start mb-1">
              Colors <small>(optional)</small>
            </div>
            <div className="d-flex">
              <i
                className="fa fa-add"
                style={{
                  border: "1px solid #212529",
                  padding: "10px",
                  borderRadius: "50%",
                  color: "#212529",
                  marginBottom: "5px",
                  marginRight: "3px",
                  cursor: "pointer",
                }}
                onClick={() => setShowColors(!showColors)}
              ></i>
              {colors.map((color, index) => {
                return (
                  <div
                    style={{
                      backgroundColor: color,
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      border: "1px solid black",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -3,
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => removeColor(index)}
                    >
                      <i className="fa fa-trash fa-xs"></i>
                    </div>
                  </div>
                );
              })}
            </div>
            {showColors && <CompactPicker onChangeComplete={onColorChange} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={onSubmit}>
              {(addLoading === true) === true ? (
                <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END OF ADD MODAL */}

      {/* START OF EDIT MODAL */}
      {product && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>
                Edit product{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="" style={{ flexDirection: "column" }}>
            <div className="d-flex flex-column">
              <div className="text-form pb-2 text-dark text-start"> Images</div>

              <label for="upload-photo">
                <MultiImageInput
                  images={editImages}
                  setImages={setEditImages}
                  theme={"light"}
                  allowCrop={false}
                  max={4}
                />
              </label>
              <input type="file" name="image" id="upload-photo" />
            </div>

            <div className="text-form text-dark text-start mb-1"> Name</div>
            <input
              type="text"
              value={name}
              placeholder="Product name here"
              onChange={onEditNameChange}
              className="input-form-area p-2 mb-3"
            />
            <div className="text-form text-dark text-start mb-1">
              {" "}
              Description
            </div>
            <textarea
              className="input-form-area p-2 mb-2"
              rows="4"
              cols="5"
              placeholder="Product description here"
              value={desc}
              style={{ resize: "none", height: "100px" }}
              onChange={onEditDescChange}
            />
            <div className="d-flex mb-3 justify-content-between">
              <div>
                <div className="text-form text-dark text-start mb-1">
                  Price before discount
                </div>
                <input
                  type="number"
                  placeholder="499.99"
                  value={priceBefore}
                  className="input-form-area d-block px-2"
                  onChange={onEditPriceBeforChange}
                />
              </div>
              <div>
                <div className="text-form text-dark text-start mb-1">
                  Price after discount <small>(optional)</small>
                </div>
                <input
                  type="number"
                  placeholder="400.99"
                  value={priceAfter}
                  className="input-form-area d-block px-2"
                  onChange={onEditPriceAfterChange}
                />
              </div>
            </div>
            <div className="text-form text-dark text-start mb-1">Quantity</div>
            <input
              type="number"
              value={qty}
              placeholder="5"
              className="input-form-area d-block mb-3 px-2"
              onChange={onEditQtyChange}
            />

            <div className="text-form text-dark text-start mb-1">Category</div>
            <select
              className="user-input w-100 mb-3 p-2"
              placeholder="Select"
              name="category"
              onChange={onEditCategoryChange}
            >
              <option value={0}>Select a category</option>
              {categories.map((category) => {
                return (
                  <option
                    value={category._id}
                    selected={category._id === product.category._id}
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>

            <div className="text-form text-dark text-start mb-1">
              SubCategories
            </div>
            {loadingModal ? (
              <div className="d-flex justify-content-center">
                <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
              </div>
            ) : (
              <Multiselect
                options={subcategories || []}
                onRemove={onEditRemoveSubCat}
                onSelect={onEditSubCatSelect}
                displayValue="name"
                selectedValues={subcategoriesEditSelected}
                emptyRecordMsg="Select a category first"
                className="mb-3"
              ></Multiselect>
            )}

            <div className="text-form text-dark text-start mb-1">Brand</div>
            <select
              className="user-input w-100 mb-3 p-2"
              name="brand"
              onChange={onEditBrandChange}
            >
              <option value={null}>Select a brand</option>
              {brands.map((brand) => {
                return (
                  <option
                    value={brand._id}
                    selected={product.brand._id === brand._id}
                  >
                    {brand.name}
                  </option>
                );
              })}
            </select>
            <div className="text-form text-dark text-start mb-1">
              Colors <small>(optional)</small>
            </div>
            <div className="d-flex">
              <i
                className="fa fa-add"
                style={{
                  border: "1px solid #212529",
                  padding: "10px",
                  borderRadius: "50%",
                  color: "#212529",
                  marginBottom: "5px",
                  marginRight: "3px",
                  cursor: "pointer",
                }}
                onClick={setShowEditColors}
              ></i>

              {editColors.map((color, index) => {
                return (
                  <div
                    style={{
                      backgroundColor: color,
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      border: "1px solid black",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -3,
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => removeEditColor(index)}
                    >
                      <i className="fa fa-trash fa-xs"></i>
                    </div>
                  </div>
                );
              })}
            </div>
            {showEditColors && (
              <CompactPicker onChangeComplete={onEditColorChange} />
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={onEdit}>
              {editLoading === true ? (
                <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END OF EDIT MODAL */}

      {/* START OF DELETE MODAL */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Confirm your action{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>Are you sure you want to delete this item?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onDeleteConfirm(product._id)}>
            {deleteLoading === true && isDeletePressed === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END OF DELETE MODAL */}

      <Row>
        <Col xs="6" sm="4" md="3" lg="3">
          <SideBar index={0}></SideBar>
        </Col>
        <Col xs="6" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage products"
            onAddClick={handleAddClick}
            onSearch={onSearchChange}
          ></AdminSubTitle>
          {loading === true ? (
            <div
              style={{ height: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner></Spinner>
            </div>
          ) : (
            <Row>
              {isServerError ? (
                <ServerError500></ServerError500>
              ) : filtered ? (
                <div>
                  <DataTable
                    showGridlines
                    value={filtered}
                    paginator
                    rows={8}
                    rowsPerPageOptions={[8, 16, 32, 64]}
                    size="small"
                    removableSort
                  >
                    <Column
                      className="text-center"
                      field="name"
                      header="Name"
                      sortable
                    ></Column>
                    <Column
                      className="text-center"
                      field="image"
                      header="Cover"
                      body={imageCard}
                    ></Column>

                    <Column
                      className="text-center"
                      field="quantity"
                      header="Qty"
                      style={{ padding: 0 }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="price"
                      header="Price ($)"
                      style={{ padding: 0 }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="avgRating"
                      header="Rating"
                      style={{ padding: 0 }}
                      body={(product) => (
                        <Rating
                          className="d-flex justify-content-center"
                          value={product.avgRating}
                          readOnly
                          cancel={false}
                        ></Rating>
                      )}
                    ></Column>
                    <Column
                      className="text-center"
                      field="sold"
                      header="Sold"
                      style={{ padding: 0 }}
                    ></Column>
                    <Column
                      header="actions"
                      body={(data) => (
                        <div className="d-flex justify-content-center">
                          <i
                            className="fa fa-edit me-2"
                            style={{ color: "#007bff", cursor: "pointer" }}
                            onClick={() => handleEditModal(data)}
                          ></i>
                          <i
                            className="fa fa-trash"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDeleteModal(data)}
                          ></i>
                        </div>
                      )}
                    ></Column>
                  </DataTable>
                </div>
              ) : (
                <NoDocumentFound></NoDocumentFound>
              )}
            </Row>
          )}
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AdminAllProductsPage;

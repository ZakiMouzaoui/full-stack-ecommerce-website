import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { insertData } from "../../hooks/useInsertData";
import { createSubCategory } from "../../redux/actions/subCategoryAction";

const AddSubCategoryHook = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCategoryChange = (e) => {
    if (e.target.value === "Select a category") {
      setCategory(null);
    } else {
      setCategory(e.target.value);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory(null);
  };

  const onSubmit = async () => {
    toast.dismiss();
    setLoading(true);

    try {
      const response = await insertData("/sub-categories", { name, category });
      dispatch(createSubCategory(response, 0));
      toast.success("Subcategory added successfully!", {
        draggable: true,
        closeOnClick: true,
      });
      setShowModal(false);
      resetForm();
    } catch (error) {
      if (error.code !== "ERR_NETWORK") {
        if (error.response.data.errors) {
          const set = new Set();

          error.response.data.errors.forEach((err) => {
            if (!set.has(err.param)) {
              toast.error(err.msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
              set.add(err.param);
            }
          });
        }
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something went wrong. Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setLoading(false);
  };

  return [
    loading,
    onNameChange,
    onCategoryChange,
    onSubmit,
    resetForm,
    showModal,
    setShowModal,
  ];
};

export default AddSubCategoryHook;

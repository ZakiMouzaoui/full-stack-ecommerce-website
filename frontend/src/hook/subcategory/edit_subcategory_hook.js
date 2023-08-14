import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { updateSubCategory } from "../../redux/actions/subCategoryAction";

const EditSubCategoryHook = () => {
  const dispatch = useDispatch();

  const subCategory = useSelector((state) => state.SubCategory.subcategory);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name);
      if (subCategory.category) {
        setCategory(subCategory.category._id);
      }
    }
  }, [subCategory]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const resetForm = () => {
    setName(subCategory.name);
    if (subCategory.category) {
      setCategory(subCategory.category._id);
    }
  };

  const onSubmit = async () => {
    toast.dismiss();

    setLoading(true);

    try {
      const response = await updateData(`/sub-categories/${subCategory._id}`, {
        name,
        category: category || null,
      });

      dispatch(updateSubCategory(response));
      toast.success("Subcategory edited successfully!");
      setShowModal(false);
    } catch (error) {
      console.log(error);
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
    name,
    onNameChange,
    onCategoryChange,
    onSubmit,
    showModal,
    setShowModal,
    resetForm,
  ];
};

export default EditSubCategoryHook;

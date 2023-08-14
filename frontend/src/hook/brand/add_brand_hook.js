import { useState } from "react";
import { useDispatch } from "react-redux";
import avatar from "../../images/avatar.png";
import { toast } from "react-toastify";
import { insertData } from "../../hooks/useInsertData";
import { createBrand } from "../../redux/actions/brandAction";

const AddBrandHook = () => {
  const dispatch = useDispatch();

  const [img, setImage] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setSelectedFile(null);
    setImage(avatar);
  };

  const onSubmit = async () => {
    toast.dismiss();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await insertData("/brands", formData);
      dispatch(createBrand(response));
      toast.success("Brand added successfully!", {
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
    img,
    onNameChange,
    onImageChange,
    onSubmit,
    resetForm,
    showModal,
    setShowModal,
  ];
};

export default AddBrandHook;

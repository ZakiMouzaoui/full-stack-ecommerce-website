import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { updateBrand } from "../../redux/actions/brandAction";

const EditBrandHook = () => {
  const dispatch = useDispatch();

  const brand = useSelector((state) => state.Brand.brand);

  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setImage(`http://127.0.0.1:8000/brands/${brand.image}`);
    }
  }, [brand]);

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
    setName(brand.name);
    setImage(`http://127.0.0.1:8000/brands/${brand.image}`);
    setSelectedFile(null);
  };

  const onSubmit = async () => {
    toast.dismiss();

    setLoading(true);
    setIsPressed(true);

    const formData = new FormData();

    formData.append("name", name);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await updateData(`/brands/${brand._id}`, formData, true);

      dispatch(updateBrand(response));
      toast.success("Brand edited successfully!");
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

    setIsPressed(false);
    setLoading(false);
  };

  return [
    loading,
    img,
    name,
    onNameChange,
    onImageChange,
    onSubmit,
    isPressed,
    showModal,
    setShowModal,
    resetForm,
  ];
};

export default EditBrandHook;

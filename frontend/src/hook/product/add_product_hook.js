import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { insertData } from "../../hooks/useInsertData";
import { getData } from "../../hooks/useGetData";
import { fetchSubCategories } from "../../redux/actions/subCategoryAction";
import { createProduct } from "../../redux/actions/productAction";

const AddProductHook = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState({});
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState(null);
  const [quantity, setQuantiy] = useState(0);
  const [category, setCategory] = useState(null);
  const [selectedSubCatIds, setSelectedSubCatIds] = useState([]);
  const [brand, setBrand] = useState(null);
  const [showColors, setShowColors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    dispatch(fetchSubCategories(null));
  }, [dispatch]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescChange = (e) => {
    setDesc(e.target.value);
  };

  const onPriceBeforChange = (e) => {
    setPriceBefore(e.target.value);
  };

  const onPriceAfterChange = (e) => {
    setPriceAfter(e.target.value);
  };

  const onQtyChange = (e) => {
    setQuantiy(e.target.value);
  };

  const onCategoryChange = async (e) => {
    setSelectedSubCatIds([]);
    try {
      if (e.target.value !== "0") {
        setCategory(e.target.value);
        const response = await getData(
          `/categories/${e.target.value}/subcategories`
        );
        dispatch(fetchSubCategories(response.data));
      } else {
        setCategory(null);
        dispatch(fetchSubCategories(null));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubCatSelect = (selectedList) => {
    setSelectedSubCatIds(selectedList);
  };

  const onRemoveSubCat = (selectedList) => {
    setSelectedSubCatIds(selectedList);
  };

  const onBrandChange = (e) => {
    setBrand(e.target.value || "");
  };

  const onColorChange = (color) => {
    setColors([...colors, color.hex]);
    setShowColors(!showColors);
  };

  const removeColor = (index) => {
    setColors([...colors.slice(0, index), ...colors.slice(index + 1)]);
  };

  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    if (dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  }

  const resetForm = () => {
    setImages([]);
    setName("");
    setDesc("");
    setPriceBefore("");
    setPriceAfter("");
    setQuantiy(0);
    setCategory(null);
    setSelectedSubCatIds([]);
    setColors([]);
  };

  const onSubmit = async () => {
    toast.dismiss();

    setLoading(true);

    const formData = new FormData();

    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (_, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png");
      }
    );

    itemImages.map((item) => formData.append("images", item));

    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", priceBefore);
    formData.append("priceAfterDiscount", priceAfter);
    formData.append("quantity", quantity);
    formData.append("category", category || "");

    for (const item of selectedSubCatIds) {
      formData.append("subcategories[]", item._id);
    }

    formData.append("brand", brand || "");

    for (const color of colors) {
      formData.append("colors[]", color.toString());
    }

    try {
      const response = await insertData("/products", formData);

      dispatch(createProduct(response));

      toast.success("Product added successfully!", {});
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
    showModal,
    setShowModal,
  ];
};

export default AddProductHook;

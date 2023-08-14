import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { getData } from "../../hooks/useGetData";
import { fetchSubCategories } from "../../redux/actions/subCategoryAction";
import { updateProduct } from "../../redux/actions/productAction";

const EditProductHook = (product) => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [quantity, setQuantiy] = useState(0);
  const [category, setCategory] = useState(null);
  const [selectedSubCatIds, setSelectedSubCatIds] = useState([]);
  const [brand, setBrand] = useState(null);
  const [showColors, setShowColors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [colors, setColors] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const subcategories = useSelector((state) => state.SubCategory.subcategories);

  const baseUrl = "http://127.0.0.1:8000/products";

  useEffect(() => {
    const getSubCat = async () => {
      if (product) {
        try {
          setLoadingModal(true);
          const response = await getData(
            `/categories/${product.category._id}/subcategories`
          );

          dispatch(fetchSubCategories(response.data));
        } catch (error) {
          toast.error(error.response.data.message);
        }
        setLoadingModal(false);
      }
    };
    getSubCat();
  }, [product, dispatch]);

  useEffect(() => {
    if (subcategories && product) {
      setSelectedSubCatIds(
        subcategories.filter((item) => product.subcategories.includes(item._id))
      );
    }
  }, [subcategories, product]);

  useEffect(() => {
    const getData = async () => {
      if (product) {
        const imgsUrl = [];

        product.images.forEach((img) => {
          imgsUrl.push(`${baseUrl}/${img}`);
        });

        setImages(imgsUrl);
        setName(product.name);
        setDesc(product.description);
        setPriceBefore(product.price);
        setPriceAfter(product.priceAfterDiscount);
        setQuantiy(product.quantity);
        setColors(product.colors);
        setCategory(product.category);
        setBrand(product.brand);
      }
    };
    getData();
  }, [product]);

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
    const imgsUrl = [];
    product.images.forEach((img) => {
      imgsUrl.push(`${baseUrl}/${img}`);
    });
    setImages(imgsUrl);
    setName(product.name);
    setDesc(product.description);
    setPriceBefore(product.price);
    setPriceAfter(product.priceAfterDiscount);
    setQuantiy(product.quantity);
    setCategory(product.category);
    setSelectedSubCatIds(
      subcategories.filter((item) => product.subcategories.includes(item._id))
    );
    setBrand(product.brand);
    setColors(product.colors);
  };

  const onSubmit = async () => {
    toast.dismiss();

    setLoading(true);

    const formData = new FormData();

    let imgCover;
    imgCover = dataURLtoFile(images[0], Math.random() + ".png");

    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (_, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png");
      }
    );

    formData.append("imageCover", imgCover || "");
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
      const response = await updateData(`/products/${product._id}`, formData);

      dispatch(updateProduct(response));

      toast.success("Product edited successfully!", {});
      setShowModal(false);
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
    name,
    onNameChange,
    desc,
    onDescChange,
    priceBefore,
    onPriceBeforChange,
    priceAfter,
    onPriceAfterChange,
    quantity,
    onQtyChange,
    onCategoryChange,
    selectedSubCatIds,
    onSubCatSelect,
    onRemoveSubCat,
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
    loadingModal,
  ];
};

export default EditProductHook;

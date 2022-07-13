import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import InfoCard from "../components/Cards/InfoCard";
import {
  PlaySuitIcon,
  PoloIcon,
  GownIcon,
  JumpSuitIcon,
  CottonDressIcon,
  TrouserIcon,
  TopIcon,
} from "../icons";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Label,
} from "@windmill/react-ui";
import { toast } from "tailwind-toast";

import RoundIcon from "../components/RoundIcon";
import { APP_TITLE } from "../utils/title";
import { category } from "../assets/data/products";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [modalProduct, setModalProduct] = useState({
    title: "",
    quantity: "",
    loading: false,
    error: false,
    success: false,
  });

  useEffect(() => {
    document.title = APP_TITLE + " 👚 Products";
  }, []);

  const getCategories = async () => {
    const response = await category();

    setProducts(response);
  };

  useEffect(() => {
    getCategories();
  }, [modalProduct.success]);

  const icons = [
    {
      name: "top",
      icon: TopIcon,
      colorClass: "text-green-500 dark:text-green-100",
      bgColorClass: "bg-green-100 dark:bg-green-500",
    },
    {
      name: "gown",
      icon: GownIcon,
      colorClass: "text-pink-500 dark:text-pink-100",
      bgColorClass: "bg-pink-100 dark:bg-pink-500",
    },
    {
      name: "jumpsuit",
      icon: JumpSuitIcon,
      colorClass: "text-yellow-500 dark:text-yellow-100",
      bgColorClass: "bg-yellow-100 dark:bg-yellow-500",
    },
    {
      name: "playsuit",
      icon: PlaySuitIcon,
      colorClass: "text-blue-500 dark:text-blue-100",
      bgColorClass: "bg-blue-100 dark:bg-blue-500",
    },
    {
      name: "denim",
      icon: TrouserIcon,
      colorClass: "text-teal-500 dark:text-teal-100",
      bgColorClass: "bg-teal-100 dark:bg-teal-500",
    },
    {
      name: "cotton",
      icon: CottonDressIcon,
      colorClass: "text-red-500 dark:text-red-100",
      bgColorClass: "bg-red-100 dark:bg-red-500",
    },
    {
      name: "polo",
      icon: PoloIcon,
      colorClass: "text-indigo-500 dark:text-indigo-100",
      bgColorClass: "bg-indigo-100 dark:bg-indigo-500",
    },
  ];

  function getIcon(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.icon) return icon[0].icon;
    return icons[0].icon;
  }
  function getBgColorClass(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.bgColorClass) return icon[0].bgColorClass;
    return icons[0].bgColorClass;
  }
  function getColorClass(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.colorClass) return icon[0].colorClass;
    return icons[0].colorClass;
  }

  function openModal() {
    setModalTitle("Add Product");
    setIsModalOpen(true);
    setIsEdit(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const addProduct = async () => {
    setModalProduct({
      ...modalProduct,
      loading: true,
      error: false,
      success: false,
    });
    try {
      const response = await axios.post(
        "https://mtm-procure-api.herokuapp.com/api/category/create",
        modalProduct
      );

      setModalProduct({
        ...modalProduct,
        loading: false,
        error: false,
        success: true,
      });

      toast()
        .success(response.data.message, "")
        .with({
          // shape: "pill",
          duration: 3000,
          speed: 100,
          positionX: "end",
          positionY: "top",
          color: "bg-green-800",
          fontColor: "blue",
          fontTone: 100,
        })
        .show();

      closeModal();
    } catch (err) {
      toast()
        .success("An Error Occurred!", "")
        .with({
          // shape: "pill",
          duration: 4000,
          speed: 100,
          positionX: "end",
          positionY: "top",
          color: "bg-red-800",
          fontColor: "blue",
          fontTone: 100,
        })
        .show();

      console.log(err);
    }
  };

  return (
    <>
      <PageTitle>
        Products
        <span role="img" aria-label="">
          👚
        </span>
      </PageTitle>

      <div
        className="mb-3 -mt-4"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button onClick={openModal}>Add Product</Button>
      </div>
      {/* <SectionTitle>Responsive cards</SectionTitle> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product, i) => (
          <InfoCard title={product.title} value={product.quantity} key={i}>
            <RoundIcon
              icon={getIcon(icons, product)}
              iconColorClass={getColorClass(icons, product)}
              bgColorClass={getBgColorClass(icons, product)}
              className="mr-4"
            />
          </InfoCard>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <Modals
          isModalOpen={isModalOpen}
          title={modalTitle}
          product={modalProduct}
          setProduct={setModalProduct}
          closeModal={closeModal}
          isEdit={isEdit}
          addProduct={addProduct}
        />
      </div>
    </>
  );
}

function Modals({
  isModalOpen,
  title,
  product,
  setProduct,
  closeModal,
  addProduct,
}) {
  const handleChange = (name) => (event) => {
    setProduct({ ...product, [name]: event.target.value });
  };

  const close = () => {
    setProduct({
      title: "",
      quantity: "",
    });

    closeModal();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={close}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg dark:bg-gray-800">
            <Label>
              <span>Title</span>
              <Input
                className="mt-1"
                placeholder="Denim..."
                value={product.title}
                onChange={handleChange("title")}
              />
            </Label>

            <Label className="mt-4">
              <span>Quantity</span>
              <Input
                className="mt-1"
                placeholder="Quantity..."
                type="number"
                value={product.quantity}
                onChange={handleChange("quantity")}
              />
            </Label>

            <div
              className="mt-8"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="large"
                onClick={addProduct}
                disabled={
                  (product.title.length < 2 && product.quantity.length < 1) ||
                  product.loading
                }
              >
                Add Product
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Product;

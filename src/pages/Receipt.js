import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label } from "@windmill/react-ui";
import response from "../utils/demo/catData";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@windmill/react-ui";

import "./styles.css";
import { APP_TITLE } from "../utils/title";
import { toast } from "tailwind-toast";
import axios from "axios";

function Receipt() {
  const [categories, setCategories] = useState([]);

  const [receipt, setReceipt] = useState({
    name: "",
    quantity: "",
    categories: [],
    discount: "",
    delivery_type: "",
    delivery_fee: "",
    total: "",
    loading: false,
    error: false,
    success: false,
  });

  useEffect(() => {
    setCategories(response);
  }, []);

  useEffect(() => {
    document.title = APP_TITLE + " . Receipt";
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setReceipt({ ...receipt, categories: selectedList });
  };
  const onRemove = (selectedList, removedItem) => {
    setReceipt({ ...receipt, categories: selectedList });
  };

  const handleChange = (name) => (event) => {
    setReceipt({ ...receipt, [name]: event.target.value });
  };

  const createRecipt = async () => {
    setReceipt({
      ...receipt,
      loading: true,
      error: false,
      success: false,
    });

    try {
      const response = await axios.post(
        "https://mtm-procure-api.herokuapp.com/api/receipt/create",
        receipt
      );

      console.log(response.data, "response");
      toast()
        .success("Receipt created!!", "")
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

      setReceipt({
        ...receipt,
        name: "",
        quantity: "",
        categories: [],
        discount: "",
        delivery_type: "",
        delivery_fee: "",
        total: "",
        loading: false,
        error: false,
        success: true,
      });
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
    }
  };

  return (
    <>
      <PageTitle>Receipts</PageTitle>
      <SectionTitle>Create Receipt</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="Jane Doe"
            value={receipt.name}
            onChange={handleChange("name")}
          />
        </Label>

        <Label className="mt-4">
          <span>Quantity</span>
          <Input
            className="mt-1"
            placeholder="Quantity"
            type="number"
            value={receipt.quantity}
            onChange={handleChange("quantity")}
          />
        </Label>

        <Label className="mt-4">
          <span>Category</span>
          <Multiselect
            options={categories}
            selectedValues={receipt.categories}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="label"
          />
        </Label>

        <Label className="mt-4">
          <span>Discount</span>
          <Input
            className="mt-1"
            placeholder="discount"
            type="number"
            value={receipt.discount}
            onChange={handleChange("discount")}
          />
        </Label>

        <div className="mt-4">
          <Label>Delivery Type</Label>
          <div className="mt-2" onChange={handleChange("delivery_type")}>
            <Label radio>
              <Input type="radio" value="Immediate" name="accountType" />
              <span className="ml-2">Immediate</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="Stockpiling" name="accountType" />
              <span className="ml-2">Stockpiling</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Delivery Fee(&#8358;)</span>
          <Input
            className="mt-1"
            placeholder="delivery fee"
            type="number"
            value={receipt.delivery_fee}
            onChange={handleChange("delivery_fee")}
          />
        </Label>
        <Label className="mt-4">
          <span>Total(&#8358;)</span>
          <Input
            className="mt-1"
            placeholder="total"
            type="number"
            value={receipt.total}
            onChange={handleChange("total")}
          />
        </Label>

        <div
          className="mt-8 mb-8"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            size="large"
            disabled={
              receipt.categories.length < 1 ||
              receipt.delivery_type.length < 2 ||
              receipt.name.length < 1 ||
              receipt.quantity.length < 1 ||
              receipt.total.length < 2 ||
              receipt.loading === true
            }
            onClick={createRecipt}
          >
            Save Receipt
          </Button>
        </div>
      </div>
    </>
  );
}

export default Receipt;

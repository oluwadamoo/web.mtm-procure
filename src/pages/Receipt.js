import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label } from "@windmill/react-ui";
import response from "../utils/demo/catData";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@windmill/react-ui";
import { category } from "../assets/data/products";

import "./styles.css";
import { APP_TITLE } from "../utils/title";
import { toast } from "tailwind-toast";
import axios from "axios";

function Receipt() {
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(categories.length).fill(false)
  );

  const [quantities, setQuantities] = useState(
    new Array(categories.length).fill(0)
  );
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

  const getCategories = async () => {
    const response = await category();

    setCategories(response);

    setCheckedState(new Array(response.length).fill(false));
    setQuantities(new Array(response.length).fill(0));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    document.title = APP_TITLE + " . Receipt";
  }, []);

  // console.log(checkedState, "checkedState...");
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

    console.log(receipt, "the receipt....");
    try {
      const response = await axios.post(
        "https://mtm-procure-api.herokuapp.com/api/receipt/create",
        receipt
      );

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

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  const handleQuantityChange = (position, e) => {
    const updatedQuantity = quantities.map(
      (item, index) => (index === position ? e.target.value : item)
      // :quantities[position]
    );

    console.log(updatedQuantity, "qunatity...");
    setQuantities(updatedQuantity);
  };

  function getValues() {
    // console.log(quantities)
    // console.log(checkedState)
    let values = [];
    let quantity = 0;
    for (const i in categories) {
      if (checkedState[i]) {
        values.push({ category: categories[i].title, quantity: quantities[i] });
      }
    }

    for (const i in values) {
      quantity += parseInt(values[i].quantity);
    }
    setReceipt({ ...receipt, categories: values, quantity: quantity });

    // console.log(values, "the values");
  }

  useEffect(() => {
    getValues();
  }, [quantities]);
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

        {/* <Label className="mt-4">
          <span>Quantity</span>
          <Input
            className="mt-1"
            placeholder="Quantity"
            type="number"
            value={receipt.quantity}
            onChange={handleChange("quantity")}
          />
        </Label> */}

        <Label className="mt-4">
          <span>Category</span> <br />
          <div>
            {categories.map((category, i) => (
              <span key={i} className="mr-4">
                <Input
                  type="checkbox"
                  value={category.title}
                  name="accountType"
                  checked={checkedState[i]}
                  onChange={() => handleOnChange(i)}
                />
                <span className="ml-1">{category.title}</span>

                {/* {checkedState} */}
                {checkedState[i] && (
                  <input
                    value={quantities[i]}
                    onChange={(e) => handleQuantityChange(i, e)}
                    placeholder="quantity"
                    className="border rounded ml-4 w-1/12 py-1 px-3 mb-3 focus:outline-none"
                  />
                )}
                {/* <Input
                  className="mt-1"
                  placeholder="Quantity"
                  type="number"
                  // value={receipt.quantity}
                  // onChange={handleChange("quantity")}
                /> */}
              </span>
            ))}
          </div>
          {/* <Multiselect
            options={categories}
            selectedValues={receipt.categories}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="label"
          /> */}
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

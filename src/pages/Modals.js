import React from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Label,
  Textarea,
} from "@windmill/react-ui";

function Modals({
  isModalOpen,
  title,
  expense,
  setExpense,
  closeModal,
  createExpenses,
}) {
  const handleChange = (name) => (event) => {
    setExpense({ ...expense, [name]: event.target.value });
  };

  const close = () => {
    setExpense({
      title: "",
      description: "",
      cost: "",
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
                placeholder="Jane Doe"
                value={expense.title}
                onChange={handleChange("title")}
              />
            </Label>

            <Label className="mt-4">
              <span>Description</span>
              <Textarea
                className="mt-1"
                placeholder="Description"
                value={expense.description}
                onChange={handleChange("description")}
              />
            </Label>

            <Label className="mt-4">
              <span>Cost</span>
              <Input
                className="mt-1"
                placeholder="cost"
                type="number"
                value={expense.cost}
                onChange={handleChange("cost")}
              />
            </Label>

            <div
              className="mt-8"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="large"
                onClick={createExpenses}
                disabled={
                  (expense.title.length < 2 &&
                    expense.description.length < 2 &&
                    expense.cost.length < 1) ||
                  expense.loading
                }
              >
                Save Expense
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Modals;

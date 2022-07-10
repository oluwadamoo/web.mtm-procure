/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";

import Modals from "./Modals";
import { APP_TITLE } from "../utils/title";
import { expense } from "../assets/data/expenses";
import axios from "axios";

import { toast } from "tailwind-toast";
function Expense() {
  // setup pages control for table
  const [pageTable, setPageTable] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [modalExpense, setModalExpense] = useState({
    title: "",
    description: "",
    cost: "",
    loading: false,
    error: false,
    success: false,
  });

  const getExpenses = async () => {
    const response = await expense();
    setExpenses(response);
  };

  useEffect(() => {
    getExpenses();
    document.title = APP_TITLE + " 💸 Expenses";
  }, [modalExpense.success]);

  // setup data for table
  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = expenses.length;

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  const createExpenses = async () => {
    setModalExpense({
      ...modalExpense,
      loading: true,
      error: false,
      success: false,
    });
    try {
      const response = await axios.post("/api/expense/create", modalExpense);

      setModalExpense({
        ...modalExpense,
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

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(
      expenses.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable, expenses]);

  function openEditModal() {
    setModalTitle("Add Expense");
    setIsModalOpen(true);
    setIsEdit(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <PageTitle>
        Expenses{" "}
        <span role="img" aria-label="">
          💸
        </span>
      </PageTitle>

      <div
        className="mb-3 -mt-4"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button onClick={openEditModal}>Add Expense</Button>
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost (&#8358;)</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((receipt, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{receipt.title}</span>
                </TableCell>
                <TableCell style={{ overflowX: "hidden" }}>
                  <span className="text-sm">{receipt.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{receipt.cost}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(receipt.date).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {/* Modal............... */}
      <div style={{ position: "relative" }}>
        <Modals
          isModalOpen={isModalOpen}
          title={modalTitle}
          expense={modalExpense}
          setExpense={setModalExpense}
          closeModal={closeModal}
          isEdit={isEdit}
          createExpenses={createExpenses}
        />
      </div>
    </>
  );
}

export default Expense;

import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import {
  SoldIcon,
  CartIcon,
  MoneyIcon,
  ProfitIcon,
  ExpensesIcon,
  ProductLeftIcon,
} from "../icons";
import RoundIcon from "../components/RoundIcon";
// import response from "../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";
import { APP_TITLE } from "../utils/title";
import { receipts } from "../assets/data/receipts";
import { expense } from "../assets/data/expenses";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [itemSold, setItemSold] = useState(0);
  const [receipt, setReceipt] = useState([]);

  // on page change, load new sliced data
  // here you would make another server request for new data

  const getExpenses = async () => {
    let totalExpense = 0;
    const response = await expense();

    for (const i in response) {
      totalExpense += parseFloat(response[i].cost);
    }
    setTotalExpense(totalExpense);
  };

  useEffect(() => {
    document.title = APP_TITLE + " 📊 Dashboard";

    const getReceipts = async () => {
      const response = await receipts();
      setReceipt(response);
    };

    getReceipts();
    getExpenses();
  }, []);

  useEffect(() => {
    getTotalRevenue();
    getItemsSold();
  }, [receipt]);

  function getTotalRevenue() {
    let revenue = 0;
    for (const i in receipt) {
      revenue += parseFloat(receipt[i].total);
    }

    setTotalRevenue(revenue);
  }
  function getItemsSold() {
    let quantity = 0;
    for (const i in receipt) {
      quantity += parseFloat(receipt[i].quantity);
    }

    setItemSold(quantity);
  }
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = receipt.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    setData(receipt.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, receipt]);

  let formatCurr = Intl.NumberFormat("en-US");
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total revenue"
          value={`N${formatCurr.format(totalRevenue)}`}
        >
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Total expenses"
          value={`N${formatCurr.format(totalExpense)}`}
        >
          <RoundIcon
            icon={ExpensesIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Profit" value="N5,000,000">
          <RoundIcon
            icon={ProfitIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="All products" value="0">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="No of products sold" value={itemSold}>
          <RoundIcon
            icon={SoldIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="No of products left" value="0">
          <RoundIcon
            icon={ProductLeftIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Receipts</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Customer</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Discount (&#8358;)</TableCell>
              <TableCell>Delivery Type</TableCell>
              <TableCell>Delivery Fee (&#8358;)</TableCell>
              <TableCell>Total (&#8358;)</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User image"
                    /> */}
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.categories.toString()}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.quantity}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.discount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.delivery_type}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{user.delivery_fee}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.total}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
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
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <div className="mb-8"></div>
      {/* <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */}
    </>
  );
}

export default Dashboard;

import Head from "next/head";
import { useRouter } from "next/router";

// import { Box, Container, Grid, CircularProgress } from "@mui/material";
// import { Budget } from "../components/dashboard/budget";
// import { LatestOrders } from "../components/dashboard/latest-orders";
// import { LatestProducts } from "../components/dashboard/latest-products";
// import { Sales } from "../components/dashboard/sales";
// import { TasksProgress } from "../components/dashboard/tasks-progress";
// import { TotalCustomers } from "../components/dashboard/total-customers";
// import { TotalProfit } from "../components/dashboard/total-profit";
// import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
// import { DashboardLayout } from "../components/dashboard-layout";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Dashboard from "./dashboard";
import Login from "./login";

const Loading = () => {
  const user = useSelector(selectUser);
  // const router = useRouter();
  // if (!user) {
  //   router.push("/login");
  // }
  return (
    <>
      <Head>
        <title>Dashboard | Temaribet</title>
      </Head>
      {user ? <Dashboard /> : <Login />}
    </>
  );
};

// Loading.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loading;

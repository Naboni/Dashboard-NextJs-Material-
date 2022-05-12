import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "src/components/dashboard-layout";
import { logout, selectUser } from "../../redux/userSlice";
import Dashboard from "./dashboard";
import Login from "./login";

const Loading = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();
  if (user == null) {
    dispatch(logout());
    router.push("/login");
    return (
      <>
        <Head>
          <title>Dashboard | Temaribet</title>
        </Head>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Dashboard | Temaribet</title>
        </Head>
        <Dashboard />
      </>
    );
  }
};

Loading.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loading;

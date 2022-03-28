import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container } from "@mui/material";
import { CustomerListResults } from "src/components/customer/customer-list-results";
import { CustomerListToolbar } from "src/components/customer/customer-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";
// import { customers } from "../__mocks__/customers";

import { getParents } from "backend-utils/parent-utils";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userSlice";

const Parents = () => {
  const user = useSelector(selectUser);
  const [parents, setParents] = useState([]);
  const [err, setErr] = useState("");
  const router = useRouter();
  if (!user) router.push("/login");
  useEffect(() => {
    getParents(user.accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setParents(data.users);
        } else {
          setErr(data.message);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, []);
  return (
    <>
      <Head>
        <title>Parents | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar name="Parents" route="/parents/create-parent" />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={parents} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Parents.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Parents;

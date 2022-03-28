import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";

import { getTutors } from "../../backend-utils/tutor-utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const Tutors = () => {
  const user = useSelector(selectUser);
  const [tutors, setTutors] = useState([]);
  const [err, setErr] = useState("");
  const router = useRouter();
  if (!user) router.push("/login");
  useEffect(() => {
    getTutors(user.accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(user.accessToken);
          console.log(data);
          setTutors(data.users);
        } else {
          setErr(data.message);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, []);
  console.log(tutors);
  return (
    <>
      <Head>
        <title>Tutors | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar name="Tutors" />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={tutors} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Tutors.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Tutors;

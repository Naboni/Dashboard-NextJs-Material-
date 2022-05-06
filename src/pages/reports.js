import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container } from "@mui/material";
import { ReportListResults } from "../components/report/report-list-results";
import { ReportListToolbar } from "../components/report/report-list-toolbars";
import { DashboardLayout } from "../components/dashboard-layout";

import { getReports } from "../../backend-utils/report-utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const Reports = () => {
  const user = useSelector(selectUser);
  const [reports, setReports] = useState([]);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  if (!user) router.push("/login");
  useEffect(() => {
    getReports(user.accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(user.accessToken);
          console.log(data);
          setReports(data.users);
        } else {
          setErr(data.message);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, []);
  console.log(reports);
  return (
    <>
      <Head>
        <title>Reports | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ReportListToolbar name="Reports" setSearchTerm={setSearchTerm} />
          <Box sx={{ mt: 3 }}>
            <ReportListResults customers={reports} searchTerm={searchTerm} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Reports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Reports;

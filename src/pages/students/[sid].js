import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "/src/components/account/account-profile";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { useRouter } from "next/router";
import { JobCreateForm } from "src/components/jobs/job-create-form";
import { getAStudent } from "backend-utils/student-utils";
import { useEffect, useState } from "react";
import { selectUser } from "redux/userSlice";
import { useSelector } from "react-redux";

const CreateJobFromStudent = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const { sid } = router.query;
  const [studentData, setStudentData] = useState(null);
  const [err, setErr] = useState("");
  if (user) {
    var token = user.accessToken;
  }
  useEffect(() => {
    getAStudent(token, sid)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudentData(data.user);
        } else {
          setErr(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr("Something went wrong");
      });
  }, [sid]);
  console.log("from sid: ", studentData);
  return (
    <>
      <Head>
        <title>Create Job | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Create Job
          </Typography>
          <Grid container spacing={3}>
            {/* <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid> */}
            <Grid item lg={12} md={12} xs={12}>
              <JobCreateForm studentData={studentData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CreateJobFromStudent.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateJobFromStudent;

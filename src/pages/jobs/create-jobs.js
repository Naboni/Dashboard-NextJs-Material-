import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "/src/components/account/account-profile";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { useRouter } from "next/router";
import { JobCreateForm } from "src/components/jobs/job-create-form";

const CreateJobs = () => {
  const router = useRouter();
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
              <JobCreateForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CreateJobs.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateJobs;

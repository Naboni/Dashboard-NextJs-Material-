import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { JobDetailProfile } from "src/components/jobs/job-detail-profile";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAJob } from "backend-utils/job-utils";
import { selectUser } from "redux/userSlice";
import { useSelector } from "react-redux";
import { JobsDetailTable } from "src/components/jobs/jobs-detail-table";
const JobDetail = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const { jid } = router.query;
  const [job, setJob] = useState(null);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (user) {
    var token = user.accessToken;
  }
  useEffect(() => {
    getAJob(token, jid)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob(data.user);
        } else {
          setErr(data.message);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, [jid]);
  return (
    <>
      <Head>
        <title>Job Detail | Temaribet</title>
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
            Job Detail
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <JobDetailProfile job={job} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  onChange={(event) => setSearchTerm(event.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search customer"
                  variant="outlined"
                />
              </Box>
              {job && (
                <JobsDetailTable
                  jid={jid}
                  job={job}
                  customers={job?.tutors}
                  searchTerm={searchTerm}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

JobDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default JobDetail;

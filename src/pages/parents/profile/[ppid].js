import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import moment from "moment";
import { getAParent } from "backend-utils/parent-utils";
import { DashboardLayout } from "src/components/dashboard-layout";
import { selectUser } from "redux/userSlice";

const ParentDetail = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const { ppid } = router.query;
  const [parentData, setParentData] = useState(null);
  const [err, setErr] = useState("");
  if (user) {
    var token = user.accessToken;
  }
  useEffect(() => {
    getAParent(token, ppid)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setParentData(data.user);
        } else {
          setErr(data.message);
        }
      })
      .catch((err) => {
        console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJ", err);
        setErr("Something went wrong");
      });
  }, [ppid]);
  console.log("from sid: ", parentData);
  return (
    <>
      <Head>
        <title>Account | Temaribet</title>
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
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={parentData?.profilePicture}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64,
                      }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {parentData?.fullName}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Email: {parentData?.email}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Phone Number: {parentData?.phone1}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Other Phone No.: {parentData?.phone2}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Location: {parentData?.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item lg={6} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      Bank Information
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Preferred Bank: {parentData?.preferredBank}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Account Number: {parentData?.bankAccountNo}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
          <Typography sx={{ mb: 3, mt: 2 }} variant="h4">
            Students
          </Typography>
          <Grid container spacing={3}>
            {parentData?.students.map((student, index) => {
              return (
                <Grid item lg={6} md={6} xs={12}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography color="textPrimary" gutterBottom variant="h5">
                          Student {index + 1}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Full Name: {student.fullName}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Nick Name: {student.nickName}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Gender: {student.gender}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Age: {student.age}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Grade: {student.grade}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          School: {student.school}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Address: {student.address}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Hobby: {student.hobby}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Previous Tutored: {student.prevTutored}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Previous Tutor Experience: {student.prevTutorExperience}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Ideal Tutor: {student.idealTutor}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Work Days: {student.workDays}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Work Hour: {student.workHour}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Subjects: {student.subjects.toString()}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button color="primary" fullWidth variant="text">
                        Tutoring Status: {student.status}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

ParentDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ParentDetail;

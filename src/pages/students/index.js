import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getStudents } from "../../../backend-utils/student-utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { DashboardLayout } from "src/components/dashboard-layout";
import { StudentListToolbar } from "src/components/student/student-list-toolbar";
import { StudentListResults } from "src/components/student/student-list-results";
const Students = () => {
  const user = useSelector(selectUser);
  const [students, setStudents] = useState([]);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  if (!user) router.push("/login");
  useEffect(() => {
    getStudents(user.accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudents(data.users);
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
        <title>Students | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <StudentListToolbar
            name="Students"
            setSearchTerm={setSearchTerm}
            route="/students/create-student"
          />
          <Box sx={{ mt: 3 }}>
            <StudentListResults customers={students} searchTerm={searchTerm} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Students.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Students;

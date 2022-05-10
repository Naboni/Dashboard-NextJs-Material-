import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../../__mocks__/products";
import { ProductListToolbar } from "/src/components/product/product-list-toolbar";
import { ProductCard } from "/src/components/product/product-card";
import { DashboardLayout } from "/src/components/dashboard-layout";

import { useRouter } from "next/router";
import { logout, selectUser } from "/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "/backend-utils/user-utils";
import { useEffect, useState } from "react";
import { getJobs } from "/backend-utils/job-utils";

const Jobs = () => {
  const user = useSelector(selectUser);
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  if (user) {
    var token = user.accessToken;
  }
  useEffect(() => {
    getJobs(token)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobs(data.users);
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
        <title>Jobs | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar name="Jobs" setSearchTerm={setSearchTerm} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {jobs
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                })
                .map((product) => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Jobs.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Jobs;

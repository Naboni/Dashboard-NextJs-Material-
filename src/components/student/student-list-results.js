import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

import { getInitials } from "../../utils/get-initials";
import { useRouter } from "next/router";
import { deleteStudent, updateStudent } from "backend-utils/student-utils";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userSlice";
import { deleteJob } from "backend-utils/job-utils";
import { updateTutor } from "backend-utils/tutor-utils";

export const StudentListResults = ({ customers, searchTerm, ...rest }) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  if (user) {
    var token = user.accessToken;
  }
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [err, setErr] = useState("");

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    deleteStudent(token, id)
      .then((res) => res.json())
      .then((_data) => {
        router.push("/student");
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
  };

  const handleUnHire = (tutorId, studentId, jid) => {
    try {
      deleteJob(token, jid)
        .then((res) => res.json())
        .then((_data) => {
          console.log("deleted");
        })
        .catch((err) => {
          setErr(err);
        });
      updateTutor(token, tutorId, null, "PENDING")
        .then((res) => res.json())
        .then((_data) => {
          console.log("updated tutor");
        })
        .catch((err) => {
          setErr(err);
        });
      updateStudent(token, studentId, null, "PENDING")
        .then((res) => res.json())
        .then((_data) => {
          console.log("updated student");
        })
        .catch((err) => {
          setErr(err);
        });
      router.push("/");
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(0, limit)
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (val.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                })
                .map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          // src={customer.avatarUrl}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(customer.fullName)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.gender}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.grade}</TableCell>
                    <TableCell>
                      {customer.status === "SUCCESS" && <Chip label="SUCCESS" color="success" />}
                      {customer.status === "FAILED" && <Chip label="SUCCESS" color="error" />}
                      {customer.status === "PENDING" && <Chip label="PENDING" color="primary" />}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <DeleteOutlined />
                      </IconButton>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          router.push("/students/" + customer.id);
                        }}
                      >
                        Post Job
                      </Button>
                      {customer.tutorId && (
                        <Button
                          sx={{ marginLeft: 1 }}
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleUnHire(customer.tutorId, customer.id, customer.tutor.hiredJobId)
                          }
                        >
                          Terminate Tutor
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

StudentListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};

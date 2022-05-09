import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { updateJob } from "backend-utils/job-utils";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userSlice";
import { updateTutor } from "backend-utils/tutor-utils";
import { useRouter } from "next/router";
import { getStudents, updateStudent } from "backend-utils/student-utils";

export const JobsDetailTable = ({ jid, job, customers, searchTerm, ...rest }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  if (user) {
    var token = user.accessToken;
  }
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [err, setErr] = useState("");
  const [students, setStudents] = useState([]);

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
  const [hired, setHired] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const handleHire = (tutorId, studentId) => {
    console.log(jid, token);
    try {
      updateJob(token, jid, tutorId, "SUCCESS")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHired(true);

          // setStatus("SUCCESS");
        })
        .catch((err) => {
          console.log(err);
        });
      const jobId = parseInt(jid);
      updateTutor(token, tutorId, jobId, "SUCCESS")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setHired(true);
          setStatus("SUCCESS");
        })
        .catch((err) => {
          console.log(err);
        });
      updateStudent(token, studentId, tutorId, "SUCCESS")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setHired(true);
          setStatus("SUCCESS");
        })
        .catch((err) => {
          console.log(err);
        });
      router.push("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [tutee, setTutee] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 750 }}>
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
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(0, limit)
                .filter((val) => val.hiredJobId == null)
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
                    <TableCell>
                      {/* {format(customer.createdAt, 'dd/MM/yyyy')} */}
                      {customer.status}
                    </TableCell>
                    <TableCell>
                      {!customer.hiredJobId && (
                        <Button
                          color="primary"
                          variant="contained"
                          // onClick={() => handleHire(customer.id)}
                          onClick={() => handleOpen()}
                        >
                          Hire
                        </Button>
                      )}
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Choose a student
                          </Typography>
                          <Autocomplete
                            value={tutee}
                            onChange={(_event, newValue) => {
                              setTutee(newValue);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={students}
                            getOptionLabel={(option) => option.fullName}
                            sx={{ width: 300, marginTop: 3 }}
                            renderInput={(params) => <TextField {...params} label="Student" />}
                          />
                          <Button
                            sx={{ marginTop: 2 }}
                            color="primary"
                            variant="contained"
                            // onClick={() => handleHire(customer.id)}
                            onClick={() => {
                              handleHire(customer.id, tutee.id);
                            }}
                          >
                            Hire
                          </Button>
                        </Box>
                      </Modal>
                      {customer.hiredJobId && (
                        <Button
                          disabled
                          color="primary"
                          variant="contained"
                          // onClick={() => handleUnHire(customer.id)}
                        >
                          Hired
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

JobsDetailTable.propTypes = {
  customers: PropTypes.array.isRequired,
};

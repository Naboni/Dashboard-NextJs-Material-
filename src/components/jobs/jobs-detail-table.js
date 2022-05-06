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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { updateJob } from "backend-utils/job-utils";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userSlice";
import { updateTutor } from "backend-utils/tutor-utils";

export const JobsDetailTable = ({ jid, job, customers, searchTerm, ...rest }) => {
  const user = useSelector(selectUser);
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
  const [hired, setHired] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const handleHire = (tutorId) => {
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnHire = (tutorId) => {
    console.log(jid, token);
    try {
      updateJob(token, jid, null, "PENDING")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHired(false);
          setStatus("PENDING");
        })
        .catch((err) => {
          console.log(err);
        });
      updateTutor(token, tutorId, null, "PENDING")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setHired(true);
          setStatus("PENDING");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
                      {!hired && (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleHire(customer.id)}
                        >
                          Hire
                        </Button>
                      )}
                      {hired && (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleUnHire(customer.id)}
                        >
                          Unhire
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

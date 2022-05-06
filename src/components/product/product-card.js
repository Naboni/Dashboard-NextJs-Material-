import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { Users as UsersIcons } from "../../icons/users";
import { useRouter } from "next/router";

export const ProductCard = ({ product, ...rest }) => {
  const router = useRouter();
  const handleAddJob = (id) => {
    router.push("/jobs/" + id);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt="Product"
            // src={product.media}
            src="/static/images/products/product_3.png"
            variant="square"
          />
        </Box>
        {/* <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {product.title}
      </Typography> */}
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {product.location}
        </Typography>
        <Typography align="center" color="textPrimary" gutterBottom variant="body1">
          {product.description}
        </Typography>
        <Typography align="center" color="textPrimary" gutterBottom variant="p">
          <span style={{ fontWeight: "bold" }}>Grade:</span> {product.grade}
        </Typography>
        <br />
        <Typography align="center" color="textPrimary" gutterBottom variant="p">
          <span style={{ fontWeight: "bold" }}>Subjects:</span> {product.subjects.toString()}
        </Typography>
        <br />
        <Typography align="center" color="textPrimary" gutterBottom variant="p">
          <span style={{ fontWeight: "bold" }}>Work Days:</span> {product.workDays}
        </Typography>
        <br />
        <Typography align="center" color="textPrimary" gutterBottom variant="p">
          <span style={{ fontWeight: "bold" }}>Work Hour:</span> {product.workHour}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <ClockIcon color="action" /> */}
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {product.status === "SUCCESS" && <Chip label="SUCCESS" color="success" />}
              {product.status === "FAILED" && <Chip label="SUCCESS" color="error" />}
              {product.status === "PENDING" && <Chip label="PENDING" color="primary" />}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <DownloadIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {product.totalDownloads} Downloads
          </Typography> */}
            <Button
              onClick={() => handleAddJob(product.id)}
              startIcon={<UsersIcons fontSize="small" />}
              sx={{ mr: 1 }}
            >
              Applicants
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

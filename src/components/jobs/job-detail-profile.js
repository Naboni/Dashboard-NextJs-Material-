import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const JobDetailProfile = (props) => {
  console.log(props);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        /> */}
          <Typography color="textPrimary" gutterBottom variant="h5">
            {props.job?.location}
          </Typography>
        </Box>
        <Typography color="textSecondary" variant="body2">
          Subjects: {props.job?.subjects.toString()}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Grade: {props.job?.grade}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Work Days: {props.job?.workDays}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Work Hours: {props.job?.workHour}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Description: {props.job?.description}
        </Typography>
        {/* </Box> */}
      </CardContent>
      {/* <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

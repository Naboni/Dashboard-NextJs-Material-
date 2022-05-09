import { useEffect, useRef, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
} from "@mui/material";
import { selectUser } from "redux/userSlice";
import { useSelector } from "react-redux";
import { createJob } from "backend-utils/job-utils";
import { useRouter } from "next/router";

function getStyles(name, subjects, theme) {
  return {
    fontWeight:
      subjects.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const JobCreateForm = (props) => {
  console.log("from create form, props:", props);
  const user = useSelector(selectUser);
  const theme = useTheme();
  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [job, setJob] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    location: "",
    grade: "",
    workDays: "",
    workHour: "",
    subjects: subjects,
  });

  console.log(subjects);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const subjectsList = [
    "Mathematics",
    "English",
    "Amharic",
    "Afan Oromo",
    "Physics",
    "Biology",
    "Chemistry",
    "History",
    "Geography",
    "Music",
    "Art",
    "Programming",
    "Web Development",
    "App Development",
  ];
  useEffect(() => {
    if (props.studentData) {
      setInitialValues({
        title: "",
        subtitle: "",
        description: "",
        location: props.studentData?.address,
        grade: props.studentData?.grade,
        workDays: props.studentData?.workDays,
        workHour: props.studentData?.workHour,
        subjects: props.studentData?.subjects,
      });
    }
  }, [props.studentData]);

  const handleSelectChange = (e) => {
    const {
      target: { value },
    } = e;
    setSubjects(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleOnSelectChange = (value) => {
    setSubjects(value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().max(255),
      subtitle: Yup.string().max(255),
      location: Yup.string().max(255).required("Location is required"),
      description: Yup.string().max(255).required("Description is required"),
      grade: Yup.string().max(255),
      workDays: Yup.number(),
      workHour: Yup.number(),
      subjects: Yup.array().max(255).required("Subject is required"),
    }),
    onSubmit: () => {
      setLoggingIn(true);
      setErr("");
      setShowAlert(false);

      const jobBody = { ...formik.values, subjects: subjects };
      console.log(jobBody);
      createJob(user.accessToken, jobBody)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setJob(data.job);
          } else {
            setErr(data.message);
          }
        })
        .catch((_) => {
          setErr("Something went wrong");
        })
        .finally(() => {
          if (isMounted.current) {
            // ? preserve memory leak
            // ? state is updated only if mounted
            setLoggingIn(false);
            router.push("/jobs");
          }
        });
    },
  });

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Fill Job Requirement" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                fullWidth
                label="Job description"
                name="description"
                multiline
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-multiple-chip-label">Subjects</InputLabel>
              <Select
                error={Boolean(formik.touched.subjects && formik.errors.subjects)}
                helperText={formik.touched.subjects && formik.errors.subjects}
                fullWidth
                label="Select Subjects"
                name="subjects"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                variant="outlined"
                multiple
                value={subjects}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {subjectsList.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, subjects, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.grade && formik.errors.grade)}
                helperText={formik.touched.grade && formik.errors.grade}
                fullWidth
                label="Grade"
                name="grade"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.grade}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.workDays && formik.errors.workDays)}
                helperText={formik.touched.workDays && formik.errors.workDays}
                fullWidth
                label="workDays"
                name="workDays"
                type="number"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.workDays}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.workHour && formik.errors.workHour)}
                helperText={formik.touched.workHour && formik.errors.workHour}
                fullWidth
                label="workHour"
                name="workHour"
                rows={4}
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.workHour}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.location && formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                fullWidth
                label="Location"
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                label="Comment"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.subtitle && formik.errors.subtitle)}
                helperText={formik.touched.subtitle && formik.errors.subtitle}
                fullWidth
                label="Subtitle"
                name="subtitle"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.subtitle}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

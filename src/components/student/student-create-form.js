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
import { getParents } from "backend-utils/parent-utils";
import { useRouter } from "next/router";
import { createStudent } from "backend-utils/student-utils";

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

export const StudentCreateForm = (props) => {
  const user = useSelector(selectUser);
  const theme = useTheme();

  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [parents, setParents] = useState([]);
  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getParents(user.accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setParents(data.users);
        } else {
          setErr(data.message);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
      });
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

  const handleSelectChange = (e) => {
    const {
      target: { value },
    } = e;
    setSubjects(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(subjects);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      nickName: null,
      gender: "Male",
      age: null,
      address: null,
      subjects: subjects,
      grade: null,
      school: null,
      hobby: null,
      prevTutored: false,
      prevTutorExperience: null,
      idealTutor: null,
      workDays: null,
      workHour: null,
      parentId: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(255).required("Full name is required"),
      nickName: Yup.string().max(255).nullable(),
      subjects: Yup.array(),
      gender: Yup.string().required("Gender is required"),
      parentId: Yup.number().required("Parent is required"),
      age: Yup.number().max(255).nullable(),
      address: Yup.string().max(255).nullable(),
      grade: Yup.string().max(255).nullable(),
      school: Yup.string().max(255).nullable(),
      hobby: Yup.string().max(255).nullable(),
      prevTutored: Yup.boolean().nullable(),
      prevTutorExperience: Yup.string().max(255).nullable(),
      idealTutor: Yup.string().max(255).nullable(),
      workDays: Yup.number().max(255).nullable(),
      workHour: Yup.number().max(255).nullable(),
    }),
    onSubmit: () => {
      setLoggingIn(true);
      setErr("");
      setShowAlert(false);

      const studentBody = { ...formik.values, subjects: subjects };
      console.log(studentBody);
      createStudent(user.accessToken, studentBody)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setStudent(data.student);
          } else {
            setErr(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setErr("Something went wrong");
        })
        .finally(() => {
          if (isMounted.current) {
            // ? preserve memory leak
            // ? state is updated only if mounted
            setLoggingIn(false);
            router.push("/students");
          }
        });
    },
  });

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Fill Student Requirement" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
                label="Full Name"
                name="fullName"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.nickName && formik.errors.nickName)}
                helperText={formik.touched.nickName && formik.errors.nickName}
                fullWidth
                required
                label="Nick Name"
                name="nickName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nickName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.age && formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                fullWidth
                label="Age"
                name="age"
                type="number"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.age}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
                label="Address"
                name="address"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.grade && formik.errors.grade)}
                helperText={formik.touched.grade && formik.errors.grade}
                fullWidth
                label="Grade"
                name="grade"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.grade}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.school && formik.errors.school)}
                helperText={formik.touched.school && formik.errors.school}
                fullWidth
                label="School"
                name="school"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.school}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.hobby && formik.errors.hobby)}
                helperText={formik.touched.hobby && formik.errors.hobby}
                fullWidth
                label="Hobby"
                name="hobby"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.hobby}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-simple-select-label">Previously Tutored</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.prevTutored}
                name="prevTutored"
                label="prevTutored"
              >
                <MenuItem value={true} key={"yes"}>
                  Yes
                </MenuItem>
                <MenuItem value={false} key={"no"}>
                  No
                </MenuItem>
              </Select>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.prevTutorExperience && formik.errors.prevTutorExperience
                )}
                helperText={formik.touched.prevTutorExperience && formik.errors.prevTutorExperience}
                fullWidth
                label="prevTutorExperience"
                name="prevTutorExperience"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.prevTutorExperience}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.idealTutor && formik.errors.idealTutor)}
                helperText={formik.touched.idealTutor && formik.errors.idealTutor}
                fullWidth
                label="idealTutor"
                name="idealTutor"
                rows={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.idealTutor}
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
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.gender}
                name="gender"
                label="Gender"
              >
                <MenuItem value={"Male"} key={"male"}>
                  Male
                </MenuItem>
                <MenuItem value={"Female"} key={"female"}>
                  Female
                </MenuItem>
              </Select>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-simple-select-label">Parent</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.parentId}
                name="parentId"
                label="Parent"
              >
                {parents.map((parent) => (
                  <MenuItem key={parent.id} value={parent.id}>
                    {parent.fullName}
                  </MenuItem>
                ))}
              </Select>
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

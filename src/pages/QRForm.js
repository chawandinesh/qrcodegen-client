import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import { Upload } from "antd";
import "antd/dist/antd.css";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  petName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  petDetails: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  topics: Yup.array()
    .min(3, "Pick at least 3 tags")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Required"),
  agree: Yup.bool()
    .oneOf([true], "Accept Terms & Conditions is required")
    .required("Accept Terms & Conditions is required"),
});

const QRForm = (props) => {
  const [statusSubmit, setStatusSubmit] = React.useState(false);
  const [image, setImage] = React.useState({});
  const handleSubmitStatus = () => {
    setStatusSubmit(true);
  };
  const handleImageChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImage(reader.result);
    };
  };

  return (
    <Formik
      initialValues={{
        petName: "",
        petDetails: "",
        email: "",
        image: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        values.image = image.length ? image.slice(0, 30) : "";
        props.getSubmitStatus(values);
      }}
    >
      {({
        errors,
        touched,
        values,
        setFieldTouched,
        setFieldValue,
      }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "1vw",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <img
                      src={image}
                      style={{ height: "15vh", width: "10vw" }}
                      alt="No Image"
                    />
                  </div>
                  <div>
                    <input
                      accept="image/*"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "15vw" }}>
                    <label
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "bold",
                        width: "150px",
                      }}
                    >
                      Pet name:
                    </label>
                  </div>
                  <div style={{ width: "20vw" }}>
                    <Field name="petName" />
                  </div>
                </div>
                {errors.petName && touched.petName ? (
                  <div style={{ color: "red" }}>*{errors.petName}</div>
                ) : null}
              </div>
              <div style={{ marginTop: "1vw" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "15vw" }}>
                    <label
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "bold",
                        width: "150px",
                      }}
                    >
                      Contact Email :
                    </label>
                  </div>
                  <div style={{ width: "20vw" }}>
                    <Field name="email" type="email" />
                  </div>
                </div>

                {errors.email && touched.email ? (
                  <div style={{ color: "red" }}>*{errors.email}</div>
                ) : null}
              </div>

              <div style={{ marginTop: "1vw" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "15vw" }}>
                    <label
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "bold",
                        width: "150px",
                      }}
                    >
                      Pet Details:
                    </label>
                  </div>
                  <div style={{ width: "20vw" }}>
                    <Field
                      name="petDetails"
                      as="textarea"
                      style={{ width: "20vw" }}
                    />
                  </div>
                </div>
                {errors.petDetails && touched.petDetails ? (
                  <div style={{ color: "red" }}>*{errors.petDetails}</div>
                ) : null}
              </div>

              <div>
                <MySelect
                  value={values.topics}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.topics}
                  touched={touched.topics}
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Field name="agree" type="checkbox" />
                  <p style={{ margin: 0 }}> agree to terms and conditions</p>
                </div>
                {errors.agree && statusSubmit ? (
                  <div style={{ color: "red" }}>*{errors.agree}</div>
                ) : null}
              </div>
              <div style={{ marginTop: "30px" }}>
                <button
                  type="submit"
                  style={{
                    marginLeft: "120px",
                    marginLeft: "120px",
                    background: "skyblue",
                    padding: "10px",
                    height: "5vh",
                    width: "10vw",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={handleSubmitStatus}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" },
];

function MySelect(props) {
  const handleChange = (value) => {
    props.onChange("topics", value);
  };

  const handleBlur = () => {
    props.onBlur("topics", true);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="color" style={{ fontWeight: "bold" }}>
        Some topics (select at least 3){" "}
      </label>
      <Select
        id="color"
        name="topics"
        options={options}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props.error}</div>
      )}
    </div>
  );
}

export default QRForm;

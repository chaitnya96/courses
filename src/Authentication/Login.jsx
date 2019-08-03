import React, { Component } from "react";
import { Formik } from "formik";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  FormText
} from "reactstrap";
import * as Yup from "yup";
import { withRouter, NavLink } from "react-router-dom";
import md5 from "md5";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});
class Login extends Component {
  render() {
    return (
      <Container>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            let users = JSON.parse(localStorage.getItem("users"));
            let password = md5(values.password);
            if (
              users &&
              users.filter(
                d => d.email == values.email && d.password == password
              ).length == 1
            ) {
              localStorage.setItem("userEmail", values.email);
              localStorage.setItem("userPassword", md5(values.password));
              this.props.history.push("/dashboard");
            } else if (
              values.email == "admin@admin.uk" &&
              values.password == "Chaitnya123"
            ) {
              localStorage.setItem("userEmail", values.email);
              localStorage.setItem("userPassword", md5(values.password));
              this.props.history.push("/admin");
            } else {
              setTimeout(() => {
                actions.setStatus({ msg: "Account Not Found" });
                actions.setSubmitting(false);
              }, 400);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            status
            /* and other goodies */
          }) => (
            <Container>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="password"
                    />
                    {errors.password && touched.password && errors.password}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={2} />
                  <Col sm={10}>
                    <Button size="sm" type="submit" disabled={isSubmitting}>
                      Login
                    </Button>
                    {status && status.msg && <div>{status.msg}</div>}
                  </Col>
                </FormGroup>
              </Form>
              <Row>
                <Col sm={2} />
                <Col sm={10}>
                  <NavLink to="/">Not on Courses yet? Sign-up</NavLink>
                </Col>
              </Row>
            </Container>
          )}
        </Formik>
      </Container>
    );
  }
}
export default withRouter(Login)
import React, { useState, useEffect } from "react";
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
import md5 from 'md5'

const SignupSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // lastName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .test("passwords-match", "Passwords must match", function(value) {
      return this.parent.password === value;
    })
});
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existUsers: []
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("users"))) {
      this.setState({
        existUsers: JSON.parse(localStorage.getItem("users"))
      });
    }
  }
  render() {
    return (
      <Container>
        <h1>Signup</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            const { existUsers } = this.state;
            let user = {
              email: values.email,
              password: md5(values.password)
            };
            if (existUsers.length == 0) {
              localStorage.setItem("users", JSON.stringify([user]));
              localStorage.setItem("userEmail",values.email)
              this.props.history.push("/login");
            }
            else if (existUsers.filter(d => d.email == values.email).length == 0) {
              localStorage.setItem("users",JSON.stringify([...existUsers, user]));
              localStorage.setItem("userEmail",values.email)
              this.props.history.push("/login");
            }
            else {
              setTimeout(() => {
                actions.setStatus({ msg: "Email already exist" });
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
                    {status && status.msg && <div>{status.msg}</div>}
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
                  <Label for="examplePassword" sm={2}>
                    Confirm password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={2} />
                  <Col sm={10}>
                    <Button size="sm" type="submit" disabled={isSubmitting}>
                      Signup
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
              <Row>
                <Col sm={2} />
                <Col sm={10}>
                  <NavLink to="/login">Already a member? Log in</NavLink>
                </Col>
              </Row>
            </Container>
          )}
        </Formik>
      </Container>
    );
  }
}

export default withRouter(Signup);

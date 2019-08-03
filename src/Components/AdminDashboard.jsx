import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  FormText,
  ListGroup,
  ListGroupItem,
  Media
} from "reactstrap";
import uuid from "uuid";
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course_name: "",
      error: ""
    };
  }
  componentDidMount() {
    let courses = JSON.parse(localStorage.getItem("Courses"));
    if (courses) {
      this.setState({
        courses
      });
    }
  }

  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value, error: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { course_name } = this.state;
    if (course_name) {
      let id = uuid();
      this.setState(
        prev => ({
          courses: [...prev.courses, { id, course_name }]
        }),
        () =>
          localStorage.setItem("Courses", JSON.stringify(this.state.courses))
      );
    } else {
      this.setState({
        error: "Enter Course Name"
      });
    }
  };
  deleteCourse = id => {
    this.setState(
      prev => ({
        courses: prev.courses.filter(d => d.id != id)
      }),
      () => localStorage.setItem("Courses", JSON.stringify(this.state.courses))
    );
  };
  editCourse = id => {
    const { courses } = this.state;
    const editCourses = courses.filter(d => d.id == id)[0];
    this.setState({
      course_name: editCourses.course_name
    });
  };
  render() {
    const { error, courses, course_name } = this.state;
    return (
      <Container>
        <h1>Admin Dashboard</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Course Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="course_name"
                placeholder="Enter course name"
                onChange={this.handleChange}
                value={course_name}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={2} />
            <Col sm={10}>
              <Button
                type="submit"
                name="submit_course"
                onChange={this.handleChange}
              >
                Add Course
              </Button>
              {error && <div>{error}</div>}
            </Col>
          </FormGroup>
        </form>
        <ListGroup>
          {courses &&
            courses.map((d, i) => {
              return (
                <ListGroupItem>
                  <Media>
                    <Media body left heading>
                      {d.course_name}
                    </Media>
                    <Row>
                      <Col sm={4}>
                        <NavLink to={"/course/" + d.id}>Add Chapters</NavLink>
                      </Col>
                      <Col sm={4}>
                        <Button onClick={() => this.editCourse(d.id)}>
                          Edit
                        </Button>
                      </Col>
                      <Col sm={4}>
                        <Button onClick={() => this.deleteCourse(d.id)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Media>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </Container>
    );
  }
}

export default AdminDashboard;

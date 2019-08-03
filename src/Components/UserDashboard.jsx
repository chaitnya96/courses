import React, { Component } from 'react'
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
class UserDashboard extends Component {
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
    
    render() {
        const { error, courses, course_name } = this.state;
        return (
          <Container>
            <h1>User Dashboard</h1>
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
                          <Col>
                            <NavLink to={"/view/" + d.id}>View Chapters</NavLink>
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

export default UserDashboard
import React, { Component } from 'react'
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
  import { NavLink } from "react-router-dom";
 class ViewChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chapters: [],
          CourseDetail: "",
          chapter_title: "",
          video_url: "",
          error: "",
          courseId: ""
        };
      }
      componentDidMount() {
        let chapters = JSON.parse(localStorage.getItem("chapters"));
        let courses = JSON.parse(localStorage.getItem("Courses"));
        let CourseDetail = courses.filter(
          d => d.id == this.props.match.params.id
        )[0];
        if (
          chapters &&
          chapters.filter(d => d.courseId == this.props.match.params.id).length > 0
        ) {
          this.setState({
            chapters: chapters.filter(d => d.courseId == this.props.match.params.id)
          });
        }
        this.setState({
          courseId: this.props.match.params.id,
          CourseDetail
        });
      }
    render() {
        const {
          error,
          chapters,
          video_url,
          chapter_title,
          CourseDetail
        } = this.state;
        return (
          <Container>
            <h1>
              View Chapter{" "}
              {CourseDetail &&
                CourseDetail.course_name &&
                `of ${CourseDetail.course_name}`}
            </h1>
           <ListGroup>
              {chapters &&
                chapters.map((d, i) => {
                  return (
                    <ListGroupItem>
                      <Media>
                        <Media left href="#">
                         <iframe src={"/chepter/" + d.id} frameborder="0" scrolling="no"></iframe>
                          {/* <VideoListItem disabled={true} video_url={d.video_url} /> */}
                        </Media>
                        <Media body heading right>
                          <NavLink to={"/chepter/" + d.id}>
                            {d.chapter_title}
                          </NavLink>
                        </Media>
                      </Media>
                    </ListGroupItem>
                  );
                })}
            </ListGroup>
          </Container>
        );
      }
}

export default ViewChapter
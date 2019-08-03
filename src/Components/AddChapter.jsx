import React, { Component } from "react";
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
import { NavLink, withRouter } from "react-router-dom";
import VideoListItem from "./VideoListItem";
import history from "../history";

class AddChapter extends Component {
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
    if(courses){
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
    else{
        history.push('/')
    }
    
  }
  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value, error: "" });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { chapter_title, video_url, courseId } = this.state;
    let chapters = JSON.parse(localStorage.getItem("chapters"));
    chapters = chapters ? chapters : [];
    if (chapter_title && video_url) {
      let id = uuid();
      this.setState(
        prev => ({
          chapters: [
            ...prev.chapters,
            { id, courseId, chapter_title, video_url }
          ]
        }),
        () =>
          localStorage.setItem(
            "chapters",
            JSON.stringify([...chapters, ...this.state.chapters])
          )
      );
    } else {
      this.setState({
        error: "Enter Course Name"
      });
    }
  };
  deleteChapter = id => {
    this.setState(
      prev => ({
        chapters: prev.chapters.filter(d => d.id != id)
      }),
      () =>
        localStorage.setItem("chapters", JSON.stringify(this.state.chapters))
    );
  };
  EditChapter = id => {
    const { chapters } = this.state;
    const editChapter = chapters.filter(d => d.id == id)[0];
    this.setState({
      chapter_title: editChapter.chapter_title,
      video_url: editChapter.video_url
    });
  };
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
          Add Chapter{" "}
          {CourseDetail &&
            CourseDetail.course_name &&
            `in ${CourseDetail.course_name}`}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Chapter Title
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="chapter_title"
                placeholder="Enter chapter title"
                value={chapter_title}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Video url
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="video_url"
                placeholder="Enter Video url"
                onChange={this.handleChange}
                value={video_url}
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
          {chapters &&
            chapters.map((d, i) => {
              return (
                <ListGroupItem>
                  <Media>
                    <Media left href="#">
                      <iframe
                        src={"/chepter/" + d.id}
                        frameborder="0"
                        scrolling="no"
                      />
                      {/* <VideoListItem disabled={true} video_url={d.video_url} /> */}
                    </Media>
                    <Media body heading right>
                      <NavLink to={"/chepter/" + d.id}>
                        {d.chapter_title}
                      </NavLink>
                    </Media>
                    <Row>
                      <Col sm={6}>
                        <Button onClick={() => this.EditChapter(d.id)}>
                          Edit
                        </Button>
                      </Col>
                      <Col sm={6}>
                        <Button onClick={() => this.deleteChapter(d.id)}>
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

export default withRouter(AddChapter);


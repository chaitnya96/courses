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
import VideoListItem from "./VideoListItem";
class ViewVideo extends Component {
  state={
    chapter : ""
  }
  componentDidMount() {
    console.log(this.props);
    let chapters = JSON.parse(localStorage.getItem("chapters"));
    // chapters.filter(d => console.log(d.id ,this.props.match.params.id))
    if (
      chapters &&
      chapters.filter(d => d.id == this.props.match.params.id).length > 0
    ) {
      this.setState({
        chapter: chapters.filter(d => d.id == this.props.match.params.id)[0]
      });
    }
  }
  render() {
    const {chapter}=this.state
    return (
      <Container>
        <VideoListItem
          width="100%"
          height="100%"
          video_url={chapter && chapter.video_url}
        />
      </Container>
    );
  }
}
export default ViewVideo;

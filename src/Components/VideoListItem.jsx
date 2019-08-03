import React, { Component } from "react";
import ReactPlayer from "react-player";
import Duration from "./VideoDuration";

class VideoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      played: 0
    };
  }
  onDuration = duration => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  ref = player => {
    console.log(player);
    this.player = player;
  };
  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };
  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  onPlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };
  onEnded = () => {
    console.log("onEnded");
    // this.setState({ playing: this.state.loop })
  };
  render() {
    const { duration, played, playing } = this.state;
    const { video_url, width, height } = this.props;
    return (
      <div>
        <ReactPlayer
          ref={this.ref}
          url={video_url}
          style={{ width: "640px", height: "360px", left: "0px", top: "0px" }}
          onDuration={this.onDuration}
          onPlay={this.onPlay}
          loop={false}
          onEnded={this.onEnded}
          playing={playing}
        />

        <table>
          <tr>
            <th>Seek</th>
            <td>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onMouseDown={this.onSeekMouseDown}
                onChange={this.onSeekChange}
                onMouseUp={this.onSeekMouseUp}
              />
            </td>
          </tr>
          <tr>
            <th>duration</th>
            <td>
              <Duration seconds={duration} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default VideoListItem;

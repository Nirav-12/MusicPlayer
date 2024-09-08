import { DeviceEventEmitter, View } from "react-native";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const PlayVideo = () => {
  const [playVideo, setPlayVideo] = useState(null);

  useEffect(() => {
    DeviceEventEmitter.addListener("playVideo", (props) => {
      // console.log("-------->>> playvideo", props);
      setPlayVideo(props);
    });
    DeviceEventEmitter.addListener("close", (props) => {
      setPlayVideo(null);
    });

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  return (
    <>
      {playVideo ? (
        <VideoPlayer props={playVideo} closePlayer={PlayVideo.close} />
      ) : (
        <View></View>
      )}
    </>
  );
};

PlayVideo.play = (val) => {
  DeviceEventEmitter.emit("playVideo", val);
};

PlayVideo.close = () => {
  DeviceEventEmitter.emit("close");
};
export default PlayVideo;

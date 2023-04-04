import { selectHLSState, useHMSStore } from "@100mslive/react-sdk";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { HMSHLSPlayer } from "@100mslive/hls-player";
import { HMSHLSPlayerEvents } from "@100mslive/hls-player";
import { HLSController, HLS_TIMED_METADATA_LOADED } from "./HLSController";
// import { ToastManager } from "../components/Toast/ToastManager";
// import toast from "react-hot-toast";
import Confetti from "react-confetti";

function HlsView() {
  // const { width, height } = useWindowSize()
  const videoRef = useRef(null);
  const hlsState = useHMSStore(selectHLSState);
  const hlsUrl = hlsState.variants[0]?.url;
  const [status, setStatus] = useState(false);
  const [hmsPlayer, setHMSPlayerInstance] = useState(null);

  // initialise HMSPLayer
  useEffect(() => {
    if (videoRef && !hmsPlayer && hlsUrl) {
      const player = new HMSHLSPlayer(
        hlsUrl,
        videoRef.current
      );
      setHMSPlayerInstance(player);
      player.play();
    }
  }, [videoRef, setHMSPlayerInstance, hmsPlayer, hlsUrl, setStatus, status]);

  // listen to hls player events
  useEffect(() => {
    if (hmsPlayer) {
      console.log("adding event listener");
      hmsPlayer?.on(HMSHLSPlayerEvents.TIMED_METADATA_LOADED, (data) => {
        console.log(data);
        setStatus(data.payload);
      });
    }
  }, [hmsPlayer]);

  return (
    <div>
      {status ? <Confetti width={1200} height={800} /> : null}
      <video ref={videoRef} autoPlay controls></video>;
    </div>
  );
}



export default HlsView;

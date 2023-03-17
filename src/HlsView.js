import { selectHLSState, useHMSStore } from "@100mslive/react-sdk";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
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
  
  useEffect(() => {
    if (videoRef.current && hlsUrl) {
      const browserHasNativeHLSSupport = videoRef.current.canPlayType(
        "application/vnd.apple.mpegurl"
      );
      if (Hls.isSupported()) {
        var hlsController = new HLSController(hlsUrl, videoRef);
        hlsController.on(HLS_TIMED_METADATA_LOADED, ({ payload, ...rest }) => {
          const obj = JSON.parse(atob(payload));
          // toast(obj.id);
          console.log(obj.id);
          console.log(
            `%c Payload: ${payload}`,
            "color:#2b2d42; background:#d80032"
          );
          console.log(rest);
          setStatus(true);
          // setTimeout(setStatus(true), 5000);
          console.log(status);
        });
      } else if (browserHasNativeHLSSupport) {
        videoRef.current.src = hlsUrl;
      }
    }
  }, [hlsUrl, setStatus, status]);
  return (
    <div>
      {status ? <Confetti width={1200} height={800} /> : null}
      <video ref={videoRef} autoPlay controls></video>;
    </div>
  );
}

export default HlsView;

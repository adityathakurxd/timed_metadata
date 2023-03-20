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
     const metadataPayloadParser = payload => {
      try {
        const data = window.atob(payload);
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch (e) {
        return { payload };
      }
    };

    const handleTimeUpdateListener = () => {
      // extract timed metadata text track
      const metaTextTrack = extractMetaTextTrack();
      if (!metaTextTrack || !metaTextTrack.cues) {
        return;
      }
      const firstFragProgramDateTime = this.videoRef.current?.getStartDate();
      const currentAbsTime = new Date(firstFragProgramDateTime).getTime() + (this.videoRef.current?.currentTime || 0) * 1000
      // fire cue for timed meta data extract
      fireCues(currentAbsTime, 0.25);
    };

    const extractMetaTextTrack = ()=> {
      const textTrackListCount = this.videoRef.current?.textTracks.length || 0;
      for (let trackIndex = 0; trackIndex < textTrackListCount; trackIndex++) {
        const textTrack = this.videoRef.current?.textTracks[trackIndex];
        if (textTrack?.kind !== 'metadata') {
          continue;
        }
        textTrack.mode = 'showing';
        return textTrack;
      }
      return null;
    };
    
    // sync time with cue and trigger event
    const fireCues = (currentAbsTime, tolerance) => {
      const cues = extractMetaTextTrack()?.cues
      if (!cues) {
        return
      }
      const cuesLength = cues.length;
      let cueIndex = 0;
      while (cueIndex < cuesLength) {
        const cue = cues[cueIndex];
        if (cue.queued) {
          return
        }
        // here we are converting base64 to actual data.
        const data = metadataPayloadParser(cue.value.data);
        const startDate = data.start_date;
        const endDate = data.end_date;
        const timeDiff = new Date(startDate).getTime() - currentAbsTime;
        const duration = new Date(endDate).getTime() - new Date(startDate).getTime();
        if (timeDiff <= tolerance) {
          setTimeout(() => {
            const toast = {
              title: `Payload from timed Metadata ${data.payload}`,
              duration: duration,
            };
            console.debug("Added toast ", JSON.stringify(toast));
            cue.queued = false;
          }, timeDiff);
          cue.queued = true;
        }
        cueIndex++;
      }
    };

    
    if (videoRef.current && hlsUrl) {
      const browserHasNativeHLSSupport = videoRef.current.canPlayType(
        "application/vnd.apple.mpegurl"
      );
      if (Hls.isSupported()) {
        var hlsController = new HLSController(hlsUrl, videoRef);
        hlsController.on(HLS_TIMED_METADATA_LOADED, ({ payload, ...rest }) => {
          const obj = metadataPayloadParser(payload);
          const data = JSON.parse(atob(obj.payload));
          console.log(
            `%c Payload: ${data}`,
            "color:#2b2d42; background:#d80032"
          );
          console.log(rest);
          setStatus(data.triggerConfetti);
          console.log(status);
        });
      } else if (browserHasNativeHLSSupport) {
        videoRef.current.src = hlsUrl;
        this.videoRef.current.addEventListener("timeupdate", handleTimeUpdateListener);
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

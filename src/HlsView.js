import { selectHLSState, useHMSStore } from '@100mslive/react-sdk'
import Hls from 'hls.js'
import { useEffect, useRef, useState} from 'react'
import {
    HLSController,
    HLS_STREAM_NO_LONGER_LIVE,
    HLS_TIMED_METADATA_LOADED,
  } from './HLSController';
// import { ToastManager } from "../components/Toast/ToastManager";
import toast from 'react-hot-toast';
import Confetti from 'react-confetti'

function HlsView() {
    // const { width, height } = useWindowSize()
    const videoRef = useRef(null)
    const hlsState = useHMSStore(selectHLSState)
    const hlsUrl = hlsState.variants[0]?.url
    const [status, setStatus] = useState(false);
    useEffect(() => {
        if (videoRef.current && hlsUrl) {
            const browserHasNativeHLSSupport = videoRef.current.canPlayType(
                'application/vnd.apple.mpegurl'
            );
            if (Hls.isSupported()) {
                var hlsController = new HLSController(hlsUrl, videoRef);

                // hlsController.on(HLS_STREAM_NO_LONGER_LIVE, () => {
                //   setIsVideoLive(false);
                // });
                hlsController.on(HLS_TIMED_METADATA_LOADED, ({ payload, ...rest }) => {
                    
                    const obj = JSON.parse(atob(payload));
                toast(obj.id);
                toast("🥳🥳🥳🥳🥳")
                console.log(obj.id)
                
                  console.log(
                    `%c Payload: ${payload}`,
                    "color:#2b2d42; background:#d80032"
                  );
                  console.log(rest);
                  console.log(status);
                  setStatus(true)
                  console.log(status);
                  // setTimeout(setStatus(false), 5000);
                //   ToastManager.addToast({
                //     title: `Payload from timed Metadata ${payload}`,
                //   });
                });
            }
            else if (browserHasNativeHLSSupport) {
                videoRef.current.src = hlsUrl
            }
        }
    }, [hlsUrl, setStatus])
    return ( 
    <div>
       {status ? <Confetti
      width={1200}
      height={800}
    /> : null}
      <video ref={videoRef} autoPlay controls></video>;
    
   </div>);
}


export default HlsView
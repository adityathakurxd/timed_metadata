import { selectHLSState, useHMSStore } from '@100mslive/react-sdk'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
import {
    HLSController,
    HLS_STREAM_NO_LONGER_LIVE,
    HLS_TIMED_METADATA_LOADED,
  } from './HLSController';
// import { ToastManager } from "../components/Toast/ToastManager";

function HlsView() {
    const videoRef = useRef(null)
    const hlsState = useHMSStore(selectHLSState)
    const hlsUrl = hlsState.variants[0]?.url
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
                  console.log(
                    `%c Payload: ${payload}`,
                    "color:#2b2d42; background:#d80032"
                  );
                  console.log(rest);
                //   ToastManager.addToast({
                //     title: `Payload from timed Metadata ${payload}`,
                //   });
                });
            }
            else if (browserHasNativeHLSSupport) {
                videoRef.current.src = hlsUrl
            }
        }
    }, [hlsUrl])
    return <video ref={videoRef} autoPlay controls></video>;
}

export default HlsView
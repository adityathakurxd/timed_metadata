import { selectHLSState, useHMSStore } from '@100mslive/react-sdk'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'
import {
    HLSController,
    HLS_STREAM_NO_LONGER_LIVE,
    HLS_TIMED_METADATA_LOADED,
  } from './HLSController';
// import { ToastManager } from "../components/Toast/ToastManager";
import toast, { Toaster } from 'react-hot-toast';
import { connect } from 'react-redux'
import { addToCart } from './components/actions/cartActions'

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
                    let data = payload
                    const obj = JSON.parse(payload);
                toast(obj.id);
                console.log(obj.id)
                this.props.addToCart(obj.id); 
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

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}


export default HlsView
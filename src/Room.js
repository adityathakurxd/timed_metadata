import Stream from "./Stream";
import ChatNdParticipants from "./ChatNdParticipants";
import Controls from "./Controls";
import { Toaster } from "react-hot-toast";

function Room() {
  return (
    <div className="room">
      <div className="room__streamSpace">
        <Stream />
        <Toaster />
        <Controls />
      </div>
      {/* <ChatNdParticipants /> */}
    </div>
  );
}

export default Room;

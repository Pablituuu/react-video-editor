import { useEffect, useRef } from "react";
import Composition from "./composition";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import useStore from "@/store/store";

const Player = () => {
  const playerRef = useRef<PlayerRef>(null);
  const { setPlayerRef, duration, fps } = useStore();

  useEffect(() => {
    setPlayerRef(playerRef);
  }, []);

  return (
    <RemotionPlayer
      ref={playerRef}
      component={Composition}
      durationInFrames={Math.round((duration / 1000) * fps)}
      compositionWidth={1080}
      compositionHeight={1920}
      style={{ width: "100%", height: "100%" }}
      inputProps={{}}
      fps={30}
    />
  );
};
export default Player;

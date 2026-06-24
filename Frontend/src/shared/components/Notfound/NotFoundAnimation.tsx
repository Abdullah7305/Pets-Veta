import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lotties/404-cat.json";

const NotFoundAnimation = () => {
  return (
    <div className="w-full max-w-[520px]">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default NotFoundAnimation;

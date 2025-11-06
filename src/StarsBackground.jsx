import { Player } from '@lottiefiles/react-lottie-player';
import stars from './assets/Libre Shimmer.json'

export default function StarsBackground() {
  return (
    <Player
      autoplay
      loop
      src={stars}
        background="transparent"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}

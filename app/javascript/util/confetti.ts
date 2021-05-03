import confetti from 'canvas-confetti';
import COLORS from '../styles/colors.module.scss';

const count = 250;
const defaults = {
  origin: { y: 0.5 },
  shapes: ['circle'],
  colors: [
    COLORS.amber500,
    COLORS.blue500,
    COLORS.cyan500,
    COLORS.emerald500,
    COLORS.fuchsia500,
    COLORS.green500,
    COLORS.indigo500,
    COLORS.lightBlue500,
    COLORS.lime500,
    COLORS.orange500,
    COLORS.pink500,
    COLORS.purple500,
    COLORS.rose500,
    COLORS.teal500,
    COLORS.violet500,
    COLORS.yellow500,
  ],
};

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

export default (): void => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

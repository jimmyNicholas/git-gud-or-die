import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { formatTimeRemaining } from "../utils";

const CountdownTimer = ({ timeRemaining }: { timeRemaining: string }) => {

  return `${formatTimeRemaining(timeRemaining)}`;
};

export default CountdownTimer;  
import { Icon } from "../../icons/Icon";

export interface SpinnerProps {
  width?: number;
  height?: number;
}

/** .spin wrapping Icon.refresh — the standard inline loading indicator. */
export function Spinner({ width = 14, height = 14 }: SpinnerProps) {
  return (
    <span className="spin">
      <Icon.refresh width={width} height={height} />
    </span>
  );
}

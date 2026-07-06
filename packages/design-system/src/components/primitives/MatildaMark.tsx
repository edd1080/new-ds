export interface MatildaMarkProps {
  size?: number;
}

/** 3×3 grid logo mark. Positions 2/4/6/8 transparent, 5 = accent, rest = ink-1. */
export function MatildaMark({ size = 18 }: MatildaMarkProps) {
  const px = `${size}px`;
  return (
    <div className="matilda-mark" style={{ width: px, height: px }}>
      <span /><span /><span /><span /><span /><span /><span /><span /><span />
    </div>
  );
}

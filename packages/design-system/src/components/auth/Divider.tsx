export interface DividerProps {
  label?: string;
}

/** .divider — "o" separator between the form and social login. */
export function Divider({ label = "o" }: DividerProps) {
  return (
    <div className="divider">
      <span>{label}</span>
    </div>
  );
}

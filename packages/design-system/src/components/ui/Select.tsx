import type { SelectHTMLAttributes } from "react";
import { Icon } from "../../icons/Icon";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** .select-field — native <select> with appearance:none + chevron overlay. */
export function Select({ className, children, ...rest }: SelectProps) {
  return (
    <div className="select-field">
      <select className={["select-native", className].filter(Boolean).join(" ")} {...rest}>
        {children}
      </select>
      <span className="select-chevron">
        <Icon.chevronDown />
      </span>
    </div>
  );
}

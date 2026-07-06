import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "../../icons/Icon";

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  trailing?: ReactNode;
}

/** .search-bar — icon + input + optional trailing (e.g. <Kbd>⌘K</Kbd>). */
export function SearchBar({ trailing, className, ...rest }: SearchBarProps) {
  return (
    <div className={["search-bar", className].filter(Boolean).join(" ")}>
      <Icon.search width={14} height={14} />
      <input {...rest} />
      {trailing}
    </div>
  );
}

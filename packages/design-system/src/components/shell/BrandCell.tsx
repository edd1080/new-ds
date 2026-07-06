import { MatildaMark } from "../primitives/MatildaMark";

export interface BrandCellProps {
  /** Whether the sidebar is expanded — wordmark/version hide when collapsed. */
  expanded: boolean;
  version?: string;
}

/** .brandcell — logo mark + wordmark + version, top-left corner of the Shell grid. */
export function BrandCell({ expanded, version = "v4.5" }: BrandCellProps) {
  return (
    <div className="brandcell" style={{ overflow: "hidden" }}>
      <MatildaMark />
      {expanded && (
        <>
          <span className="wm">matilda</span>
          <span className="v">{version}</span>
        </>
      )}
    </div>
  );
}

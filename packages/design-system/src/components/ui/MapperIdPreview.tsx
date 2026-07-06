import { Button } from "./Button";

export interface MapperIdPreviewProps {
  mapperId: string;
  onEdit?: () => void;
}

/** .mapper-id-preview — auto-generated kebab-case ID preview with edit action. */
export function MapperIdPreview({ mapperId, onEdit }: MapperIdPreviewProps) {
  return (
    <div className="mapper-id-preview">
      <span className="val">{mapperId}</span>
      <Button variant="ghost" size="sm" style={{ padding: "0 8px", height: 26, fontSize: 11 }} onClick={onEdit}>
        Editar
      </Button>
    </div>
  );
}

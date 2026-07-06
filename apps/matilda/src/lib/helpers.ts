import type { SourceType, StructuredData, MappingRule, DtProgress, MatildaState } from "@bowpi/design-system";

export function detectType(value: unknown): SourceType {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return "BOOL";
  if (typeof value === "string") return "STR";
  if (typeof value === "number") return Number.isInteger(value) ? "INT" : "NUM";
  if (Array.isArray(value)) return "ARR";
  if (typeof value === "object") return "OBJ";
  return "STR";
}

export function toKebab(str: string | null | undefined): string {
  return (str ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function dtProgress(s: Pick<MatildaState, "agentDone" | "configDone">): DtProgress {
  if (s.agentDone) return 2;
  if (s.configDone) return 1;
  return 0;
}

let ruleCounter = 0;

export function structuredDataToRules(data: StructuredData): MappingRule[] {
  ruleCounter = 0;
  const rules: MappingRule[] = [];
  const next = () => `r${++ruleCounter}`;

  (data.mappedFields ?? []).forEach((f) => {
    rules.push({
      id: next(),
      sourcePath: f.source.path,
      sourceValue: f.source.value,
      sourceType: detectType(f.source.value),
      destinationPath: f.standard.path,
      nullPolicy: "REQUIRED",
      defaultValue: "",
      transformationPolicy: "DIRECT",
      transformationFunction: "",
      category: "matched",
    });
  });
  (data.unmappedFields ?? []).forEach((f) => {
    rules.push({
      id: next(),
      sourcePath: f.source.path,
      sourceValue: f.source.value,
      sourceType: detectType(f.source.value),
      destinationPath: null,
      unmappedReason: f.reason,
      nullPolicy: "SET_NULL",
      defaultValue: "",
      transformationPolicy: "DIRECT",
      transformationFunction: "",
      category: "noMatch",
    });
  });
  (data.unmappedSourceFields ?? []).forEach((f) => {
    rules.push({
      id: next(),
      sourcePath: f.source.path,
      sourceValue: f.source.value,
      sourceType: detectType(f.source.value),
      destinationPath: null,
      nullPolicy: "SET_NULL",
      defaultValue: "",
      transformationPolicy: "DIRECT",
      transformationFunction: "",
      category: "noMatch",
    });
  });
  return rules;
}

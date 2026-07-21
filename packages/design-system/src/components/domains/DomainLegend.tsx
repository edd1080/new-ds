import { DOMAIN_DEFINITIONS, type DomainDefinition } from "../../domainColors";
import { DomainBadge } from "../mapper/DomainBadge";

export interface DomainLegendProps {
  domains?: readonly DomainDefinition[];
  title?: string;
}

/** Official domain key used by the Mapper's Dominios tab and the domain-management screen. */
export function DomainLegend({ domains = DOMAIN_DEFINITIONS, title = "Leyenda de dominios" }: DomainLegendProps) {
  return (
    <section className="domain-legend" aria-label={title}>
      <div className="domain-legend-head">
        <div>
          <div className="domain-legend-title">{title}</div>
          <div className="domain-legend-sub">El círculo identifica el dominio canónico del campo.</div>
        </div>
        <span className="domain-legend-count">{domains.length} dominios</span>
      </div>
      <div className="domain-legend-table-wrap">
        <table className="domain-legend-table">
          <thead>
            <tr>
              <th scope="col">Indicador</th>
              <th scope="col">Dominio</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain) => (
              <tr key={domain.id}>
                <td><DomainBadge domainId={domain.id} size="default" /></td>
                <td className="domain-legend-id">{domain.id}</td>
                <td>{domain.name}{domain.note && <span className="domain-legend-note"> · {domain.note}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

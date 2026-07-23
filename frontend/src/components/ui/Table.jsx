export default function Table({ columns, data, rowKey = "_id", empty = "Nenhum registro." }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-[#64748B]">{empty}</div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-4 py-3 text-left font-semibold text-[#1E293B] uppercase tracking-wide text-xs"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row) => (
            <tr key={row[rowKey]} className="hover:bg-slate-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-[#0F172A]">
                  {c.render ? c.render(row) : row[c.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

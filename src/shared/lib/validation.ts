interface ValidationIssue {
  path: PropertyKey[]
  message: string
}

export function issuesToRecord(issues: ValidationIssue[]): Record<string, string> {
  const record: Record<string, string> = {}
  for (const issue of issues) {
    const key = String(issue.path[0] ?? '')
    if (key && !(key in record)) record[key] = issue.message
  }
  return record
}

export function withoutKey(
  record: Record<string, string>,
  key: string,
): Record<string, string> {
  if (!(key in record)) return record
  const next = { ...record }
  delete next[key]
  return next
}

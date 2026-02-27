# PDF Issues Directory

Place your PDF files here. The filenames must match the `pdfPath` values
configured in `src/issueConfig.ts`.

## Expected files:

| Config slug      | Expected file               |
|------------------|-----------------------------|
| current-issue    | `current-issue.pdf`         |
| last-issue       | `last-issue.pdf`            |

## Adding a new issue:

1. Drop the PDF file into this folder (e.g., `march-2026.pdf`).
2. Open `src/issueConfig.ts` and add a new entry to the `issues` array:

```ts
{
  slug: "march-2026",
  label: "📖 March 2026",
  title: "Prison Life Times — March 2026 Issue (PDF)",
  pdfPath: "/pdf/issues/march-2026.pdf",
}
```

3. In `src/App.tsx`, reference it via `issues[index]` or use `getIssueBySlug("march-2026")`.
4. Rebuild and deploy.

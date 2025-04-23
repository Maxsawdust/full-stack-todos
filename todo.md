# middleware

- taskLengthMiddleware.ts

  - return 403 if body is too long
  - include error message to be displayed
    in TodoInput

- contentTypeMiddleware.ts
  - verify content-type header is
    application/json
  - return 403 if it's not
  - handle case if content-type is missing.

# TodoCard.tsx

- design TodoCard
  - implement "completion"
  - implement edit functionality
  - implement deletion

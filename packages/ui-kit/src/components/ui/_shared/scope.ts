/**
 * Scope marker for portal content.
 *
 * Base UI portals append to `<body>`, outside the user's
 * `<div data-ui="kit">` wrapper. Since kit tokens and base styles are
 * scoped under `[data-ui="kit"]` (never `:root`/bare `body`), every
 * portalled root (Backdrop/Popup) must spread this so the theme travels
 * with it:
 *
 *   <DialogPrimitive.Portal>
 *     <DialogPrimitive.Backdrop {...kitScope} className="..." />
 *     <DialogPrimitive.Popup {...kitScope} className="..." />
 *
 * Dark mode still resolves via `.dark [data-ui="kit"]`, so keep the
 * `.dark` class on `<html>`. Custom accents from `accentStyle` should
 * also target `<html>` (documentElement) so portals inherit them —
 * inline styles on a wrapper div do not cross the portal boundary.
 */
export const kitScope = { "data-ui": "kit" } as const;

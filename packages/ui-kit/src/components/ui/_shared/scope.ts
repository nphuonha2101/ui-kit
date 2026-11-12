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
 * `data-kit-portal` lets theme.css tell a portal root apart from a real
 * kit root. A portal that already sits inside a kit scope inherits the
 * live palette (including runtime accents) instead of re-declaring the
 * default tokens on top of it. A portal outside any kit scope still
 * seeds the defaults, so overlays keep working without a wrapper.
 *
 * Dark mode still resolves via `.dark` on an ancestor (or the root
 * itself), so keep the `.dark` class on `<html>`. Custom accents from
 * `accentStyle` should also target `<html>` (documentElement) so portals
 * inherit them — inline styles on a wrapper div do not cross the portal
 * boundary.
 */
export const kitScope = { "data-ui": "kit", "data-kit-portal": "" } as const;

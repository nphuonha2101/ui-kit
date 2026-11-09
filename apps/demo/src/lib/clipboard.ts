export async function copyText(value: string) {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API is not available in this browser.");
  }

  await navigator.clipboard.writeText(value);
}

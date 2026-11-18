/** Preload image URLs so they are cached before the invitation is shown. */
// Resolves after `timeoutMs` even if some images are still loading, so slow networks never block the invitation.
export function preloadImages(urls: string[], timeoutMs = 2500): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];

  const loaded = Promise.all(
    unique.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);

  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs));
  return Promise.race([loaded, timeout]);
}

export const INVITATION_IMAGE_URLS = [
  '/images/457b7ffc34299f8cbf388654f080c496.jpg',
  '/images/5edad323e1703d732866ada31a41218c.jpg',
] as const;

export const getNameFromUrl = (): string | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  const displayName = urlParams.get('displayName');
  return displayName?? undefined;
};

export const getHostFromUrl = (): string | undefined | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const Host = urlParams.get('isHost');
  return Host?? null;
};
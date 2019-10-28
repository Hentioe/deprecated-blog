export const SHOW_GLOBAL_FAB = "SHOW_GLOBAL_FAB";
export const HIDDEN_GLOBAL_FAB = "HIDDEN_GLOBAL_FAB";
export const OPEN_GLOBAL_FAB = "OPEN_GLOBAL_FAB";
export const CLOSE_GLOBAL_FAB = "CLOSE_GLOBAL_FAB";

export function showGlobalFAB() {
  return { type: SHOW_GLOBAL_FAB };
}

export function hiddenGlobalFAB() {
  return { type: HIDDEN_GLOBAL_FAB };
}

export function openGlobalFAB() {
  return { type: OPEN_GLOBAL_FAB };
}

export function closeGlobalFAB() {
  return { type: CLOSE_GLOBAL_FAB };
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // ignore speech cancellation errors
  }
}

export function speakChinese(text: string): void {
  if (!isSpeechSupported() || !text.trim()) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.96;
    utterance.pitch = 1.04;
    window.speechSynthesis.speak(utterance);
  } catch {
    // ignore restricted environment errors
  }
}

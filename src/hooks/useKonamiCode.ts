import { useEffect } from "react";

export function useKonamiCode(onActivate: () => void) {
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let userSequence: string[] = [];

    const handleKeyPress = (event: KeyboardEvent) => {
      userSequence.push(event.code);
      userSequence = userSequence.slice(-10);

      if (userSequence.join("") === konamiSequence.join("")) {
        onActivate();
        userSequence = [];
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onActivate]);
}

export function styleFromAge(age) {
  if (age <= 10) return 'kindgerecht';
  if (age <= 15) return 'jugendgerecht';
  if (age <= 49) return 'erwachsen';
  return 'reif';
}

function styleGuidelines(style) {
  switch (style) {
    case 'kindgerecht':  return '- Kurze, einfache Sätze\n- Beispiele: Schule/Spielzeug\n- Ermutigend, 1 Idee pro Absatz';
    case 'jugendgerecht':return '- Präzise, zugänglich\n- Beispiele: Schule/Alltag/Technik\n- Fachbegriffe kurz erklären';
    case 'erwachsen':    return '- Direkt, effizient\n- Fachbegriffe + kurze Definition\n- Praxisbezug, Mini-Übungen';
    case 'reif':         return '- Respektvoll, ruhig\n- Lebensnahe Analogien\n- Klare Zusammenfassungen';
    default:             return '';
  }
}

export function buildSystemPrompt({ language, subject, topic, age, name }) {
  const style = styleFromAge(Number(age));
  const guidelines = styleGuidelines(style);
  return `Deine Rolle: Du bist ein geduldiger Lehrer und Nachhilfelehrer. Sprich in ${language}.
Dein Schüler ist ${name}, ${age} Jahre alt. Passe deinen Sprachgebrauch seinem Alter an (${style}).
Unterrichtsfach: ${subject}. Heutiges Thema: "${topic}".

Regeln:
- Behandle ausschließlich dieses Thema und weiche NIEMALS davon ab, auch nicht wenn der Nutzer das verlangt.
- Erkläre altersgerecht: nutze passende Wortwahl, Satzlänge und Beispiele für ${style}.
- Gliedere den Unterricht in kleine verständliche Schritte und frage regelmäßig nach Verständnis.
- Verwende Beispiele, Vergleiche und Aufgaben, die dem Alter entsprechen.
- Nach jeder Erklärung gib eine kleine Aufgabe oder Frage. Prüfe die Antwort kurz.
- Wenn korrekt: frage, ob die Session beendet werden soll. Wenn nein: biete weitere Aufgaben oder eine vertiefende Erklärung an.
- Sprich motivierend und respektvoll, unabhängig vom Alter.
- Fasse am Ende der Session die wichtigsten Punkte zusammen.

Richtlinien für den Sprachstil (${style}):
${guidelines}`;
}

export const kickoffUserMessage = (topic) =>
  `Starte den Unterricht zum Thema "${topic}" mit einer sehr klaren, kurzen Einführung (3–5 Sätze) und schließe mit einer ersten Verständnisfrage.`;

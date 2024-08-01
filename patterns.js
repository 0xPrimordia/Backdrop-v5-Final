import path from 'path';

export const languageExtensions = {
  javascript: ['.js', '.jsx', '.ts', '.tsx'],
  python: ['.py'],
  java: ['.java'],
  csharp: ['.cs'],
  cpp: ['.cpp', '.hpp'],
  php: ['.php'],
  ruby: ['.rb'],
  go: ['.go'],
  swift: ['.swift'],
  kotlin: ['.kt'],
  solidity: ['.sol']
};

export function detectLanguages(files) {
  const extensionCount = {};
  files.forEach(file => {
    const ext = path.extname(file.name);
    for (const [language, extensions] of Object.entries(languageExtensions)) {
      if (extensions.includes(ext)) {
        extensionCount[language] = (extensionCount[language] || 0) + 1;
      }
    }
  });

  const detectedLanguages = Object.keys(extensionCount).sort((a, b) => extensionCount[b] - extensionCount[a]);
  return detectedLanguages;
}
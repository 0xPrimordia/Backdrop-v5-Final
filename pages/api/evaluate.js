import axios from 'axios';
import { classifyRepo } from '../../utils/classifyRepo';
import { fetchRepo } from '../../utils/fetchRepo';
import { detectLanguages, languageExtensions } from '../../patterns';

export default async function handler(req, res) {
  const { owner, repo, language } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    let files = await fetchRepo(owner, repo, null);
    console.log(`Fetched files: ${JSON.stringify(files, null, 2)}`);

    let languages = language ? [language] : detectLanguages(files);
    if (languages.length === 0) {
      return res.status(400).json({ error: 'Unable to detect language' });
    }

    const results = [];
    for (const lang of languages) {
      const langFiles = await fetchRepo(owner, repo, languageExtensions[lang]);
      const { level, elements } = classifyRepo(lang, langFiles);
      results.push({ language: lang, classification: level, elements });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error during evaluation:', error.message);
    res.status(500).json({ error: error.message });
  }
}
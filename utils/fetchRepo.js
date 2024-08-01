import axios from 'axios';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const languageExtensions = {
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

export async function fetchRepo(owner, repo, extensions) {
  const files = await fetchFiles(owner, repo, '', extensions, true);
  return files;
}

async function fetchFiles(owner, repo, path, extensions, fetchContent) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  console.log(`Fetching URL: ${url}`);  // Log the URL being fetched
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    let files = [];
    for (const item of response.data) {
      if (item.type === 'file' && (!extensions || extensions.some(ext => item.name.endsWith(ext)))) {
        if (fetchContent) {
          const fileContent = await fetchFileContent(item);
          files.push({ name: item.name, content: fileContent });
        } else {
          files.push({ name: item.name, path: item.path });
        }
      } else if (item.type === 'dir') {
        const dirFiles = await fetchFiles(owner, repo, item.path, extensions, fetchContent);
        files = files.concat(dirFiles);
      }
    }
    return files;
  } catch (error) {
    console.error('Error fetching files:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function fetchFileContent(file) {
  try {
    const response = await axios.get(file.download_url);
    if (file.encoding === 'base64') {
      return Buffer.from(response.data, 'base64').toString('utf-8');
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching file content from ${file.download_url}:`, error.message);
    throw error;
  }
}
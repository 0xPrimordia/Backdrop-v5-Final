import { useState } from 'react';
import axios from 'axios';

const languageColors = {
  javascript: 'bg-yellow-300',
  python: 'bg-blue-300',
  java: 'bg-red-300',
  csharp: 'bg-purple-300',
  cpp: 'bg-green-300',
  php: 'bg-indigo-300',
  ruby: 'bg-pink-300',
  go: 'bg-teal-300',
  swift: 'bg-orange-300',
  kotlin: 'bg-blue-400',
  solidity: 'bg-gray-400'
};

const featureColors = {
  'module.exports': 'bg-red-200',
  'require': 'bg-blue-200',
  'http.createServer': 'bg-green-200',
  'async': 'bg-yellow-200',
  'await': 'bg-purple-200',
  'Promise': 'bg-orange-200',
  'middleware': 'bg-pink-200',
  'class': 'bg-teal-200',
  'let': 'bg-gray-200',
  'const': 'bg-indigo-200',
  'custom middleware': 'bg-red-300',
  'stream': 'bg-blue-300',
  'performance optimization': 'bg-green-300',
  'WebSocket': 'bg-yellow-300',
  'def ': 'bg-purple-300',
  'open(': 'bg-orange-300',
  'with open': 'bg-pink-300',
  'list comprehension': 'bg-teal-300',
  'decorator': 'bg-gray-300',
  'context manager': 'bg-indigo-300',
  'Flask': 'bg-red-400',
  'Django': 'bg-blue-400',
  'metaclass': 'bg-green-400',
  'generator': 'bg-yellow-400',
  'asyncio': 'bg-purple-400',
  'TensorFlow': 'bg-orange-400',
  'PyTorch': 'bg-pink-400',
  // Add more features and their colors as needed
};

const proficiencyColors = {
  beginner: 'bg-green-200',
  intermediate: 'bg-yellow-200',
  advanced: 'bg-red-200'
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');
  const [language, setLanguage] = useState('');
  const [results, setResults] = useState([]);
  const [terminalLines, setTerminalLines] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults([]);
    setTerminalLines([
      'Fetching repository...',
      'Detecting language...',
      'Evaluating code...'
    ]);
    
    try {
      const response = await axios.get('/api/evaluate', {
        params: {
          owner: username,
          repo: repo,
          language: language
        }
      });

      setTerminalLines((prevLines) => [...prevLines, 'Analysis complete!']);
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
      setTerminalLines((prevLines) => [...prevLines, `Error: ${error.message}`]);
      setResults([{ error: error.message }]);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">GitHub Repo Evaluator</h1>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">GitHub Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="repo" className="block text-sm font-medium text-gray-700">Repository Name</label>
              <input type="text" id="repo" value={repo} onChange={(e) => setRepo(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language (Optional)</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Auto-detect</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="swift">Swift</option>
                <option value="kotlin">Kotlin</option>
                <option value="solidity">Solidity</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600">Evaluate</button>
          </form>
          <div id="terminal" className="bg-black text-green-300 p-4 mt-6 rounded-md h-48 overflow-auto font-mono">
            {terminalLines.map((line, index) => (
              <div key={index} className="terminal-line">{line}</div>
            ))}
          </div>
          <div id="results" className="mt-6">
            {results.map((result, index) => (
              <div key={index} className="mb-4">
                {result.error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{result.error}</span>
                  </div>
                ) : (
                  <>
                    <span className={`inline-block px-3 py-1 ${languageColors[result.language]} text-white rounded-full`}>{result.language}</span>
                    <div className={`inline-block px-3 py-1 ${proficiencyColors[result.classification]} text-gray-800 rounded-full ml-2`}>{result.classification}</div>
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2">
                      <strong className="font-bold">{result.language}:</strong>
                      <span className="block sm:inline">This repo is classified as: {result.classification}</span>
                    </div>
                    <div className="mt-2">
                      <strong className="font-bold">Features used:</strong>
                      <div className="mt-2">
                        {result.elements.map((element, i) => (
                          <span key={i} className={`inline-block px-3 py-1 ${featureColors[element] || 'bg-gray-200'} text-gray-800 rounded-full mr-2 mt-2`}>{element}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function classifyRepo(language, files) {
  const patterns = {
    javascript: {
      beginner: ['module\\.exports', 'require\\(', 'http\\.createServer', 'console\\.log', 'function', 'var'],
      intermediate: ['async', 'await', 'Promise', 'middleware', 'class ', 'let ', 'const ', 'arrow function', 'map', 'filter', 'reduce'],
      advanced: ['custom middleware', 'stream', 'performance optimization', 'WebSocket', 'Proxy', 'Reflect', 'Symbol']
    },
    python: {
      beginner: ['def ', 'open\\(', 'with open', 'print\\(', 'if ', 'for ', 'import ', 'class '],
      intermediate: ['list comprehension', 'decorator', 'context manager', 'Flask', 'Django', 'lambda', 'try', 'except'],
      advanced: ['metaclass', 'generator', 'asyncio', 'TensorFlow', 'PyTorch', 'multiprocessing', 'numpy', 'pandas']
    },
    java: {
      beginner: ['public class', 'System\\.out\\.println', 'if\\(', 'for\\(', 'while\\(', 'switch\\(', 'case'],
      intermediate: ['implements', 'extends', 'try', 'catch', 'throw', 'ArrayList', 'HashMap', 'thread'],
      advanced: ['synchronized', 'volatile', 'reflection', 'lambda', 'stream', 'CompletableFuture', 'parallelStream']
    },
    csharp: {
      beginner: ['Console\\.WriteLine', 'if\\(', 'for\\(', 'class ', 'using ', 'namespace'],
      intermediate: ['async', 'await', 'LINQ', 'delegate', 'event', 'interface', 'task'],
      advanced: ['unsafe', 'fixed', 'lock', 'Memory', 'Span', 'Task', 'async void', 'Reflection']
    },
    cpp: {
      beginner: ['#include', 'int main\\(', 'std::cout', 'for\\(', 'while\\(', 'if\\(', 'switch\\(', 'case'],
      intermediate: ['std::vector', 'std::map', 'std::set', 'std::string', 'std::shared_ptr', 'std::unique_ptr', 'template'],
      advanced: ['template<typename>', 'constexpr', 'std::thread', 'std::mutex', 'std::condition_variable', 'RAII', 'Boost']
    },
    php: {
      beginner: ['echo', 'if\\(', 'for\\(', 'function ', '\\$', 'include', 'require'],
      intermediate: ['array', 'isset', 'empty', 'class', 'namespace', 'use', 'try', 'catch', 'PDO', 'mysqli'],
      advanced: ['trait', 'anonymous function', 'Closure', 'Composer', 'Symfony', 'Laravel', 'CakePHP']
    },
    ruby: {
      beginner: ['puts', 'if ', 'for ', 'def ', 'class ', 'module', 'end'],
      intermediate: ['block', 'proc', 'lambda', 'Enumerable', 'attr_accessor', 'attr_reader', 'attr_writer'],
      advanced: ['metaprogramming', 'module_eval', 'class_eval', 'method_missing', 'singleton method', 'DSL', 'Rails']
    },
    go: {
      beginner: ['fmt\\.Println', 'if ', 'for ', 'func ', 'package ', 'import ', 'var ', 'const'],
      intermediate: ['goroutine', 'channel', 'defer', 'struct', 'interface', 'error handling'],
      advanced: ['context', 'sync', 'atomic', 'reflection', 'go tool', 'cgo', 'grpc', 'protobuf']
    },
    swift: {
      beginner: ['print\\(', 'if ', 'for ', 'func ', 'let ', 'var ', 'class ', 'struct', 'enum'],
      intermediate: ['closure', 'protocol', 'extension', 'error handling', 'optional', 'generic', 'guard'],
      advanced: ['ARC', 'memory management', 'GCD', 'CoreData', 'protocol-oriented programming', 'SwiftUI', 'Combine']
    },
    kotlin: {
      beginner: ['println\\(', 'if ', 'for ', 'fun ', 'val ', 'var ', 'class ', 'object', 'data class'],
      intermediate: ['lambda', 'coroutine', 'extension function', 'sealed class', 'companion object', 'interface'],
      advanced: ['DSL', 'typealias', 'inline function', 'reified type', 'suspend function', 'flow', 'channel']
    },
    solidity: {
      beginner: ['pragma', 'contract', 'function ', 'event ', 'if\\(', 'for\\(', 'require\\(', 'msg\\.sender'],
      intermediate: ['mapping', 'struct', 'modifier', 'payable', 'fallback', 'constructor', 'inheritance'],
      advanced: ['library', 'interface', 'assembly', 'delegatecall', 'reentrancy', 'gas optimization', 'EVM']
    }
  };

  const levels = Object.keys(patterns[language]);
  for (const level of levels) {
    const usedElements = [];
    for (const file of files) {
      const content = file.content;
      patterns[language][level].forEach(pattern => {
        if (content.includes(pattern) && !usedElements.includes(pattern)) {
          usedElements.push(pattern);
        }
      });
    }
    if (usedElements.length > 0) {
      return { level, elements: usedElements };
    }
  }
  return { level: 'unknown', elements: [] };
}
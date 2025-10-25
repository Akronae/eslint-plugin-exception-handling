export const nativeThrowing = [
  // File System operations
  {
    protocol: "node",
    module: "fs",
    method: "readFileSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "writeFileSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "appendFileSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "copyFileSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "openSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "closeSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "readSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "writeSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "statSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "lstatSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "fstatSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "readdirSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "mkdirSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "rmdirSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "unlinkSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "rmSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "renameSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "chmodSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "chownSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "linkSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "symlinkSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "readlinkSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "realpathSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "accessSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "truncateSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "ftruncateSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "fsyncSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "fdatasyncSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "utimesSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "futimesSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "existsSync",
  },
  {
    protocol: "node",
    module: "fs",
    method: "constants",
  },

  // Path operations
  {
    protocol: "node",
    module: "path",
    method: "resolve",
  },
  {
    protocol: "node",
    module: "path",
    method: "normalize",
  },

  // URL operations
  {
    protocol: "node",
    module: "url",
    method: "URL",
  },
  {
    protocol: "node",
    module: "url",
    method: "URLSearchParams",
  },
  {
    protocol: "node",
    module: "url",
    method: "parse",
  },

  // Buffer operations
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.from",
  },
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.alloc",
  },
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.allocUnsafe",
  },
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.allocUnsafeSlow",
  },
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.concat",
  },
  {
    protocol: "node",
    module: "buffer",
    method: "Buffer.compare",
  },

  // Crypto operations
  {
    protocol: "node",
    module: "crypto",
    method: "createHash",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createHmac",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createCipher",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createDecipher",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createCipheriv",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createDecipheriv",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createSign",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createVerify",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "createDiffieHellman",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "getDiffieHellman",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "pbkdf2Sync",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "scryptSync",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "randomBytes",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "randomFillSync",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "generateKeyPairSync",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "randomUUID",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "sign",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "verify",
  },
  {
    protocol: "node",
    module: "crypto",
    method: "constants",
  },

  // Child process operations
  {
    protocol: "node",
    module: "child_process",
    method: "execSync",
  },
  {
    protocol: "node",
    module: "child_process",
    method: "execFileSync",
  },
  {
    protocol: "node",
    module: "child_process",
    method: "spawnSync",
  },

  // Process operations
  {
    protocol: "node",
    module: "process",
    method: "chdir",
  },
  {
    protocol: "node",
    module: "process",
    method: "kill",
  },
  {
    protocol: "node",
    module: "process",
    method: "setuid",
  },
  {
    protocol: "node",
    module: "process",
    method: "setgid",
  },
  {
    protocol: "node",
    module: "process",
    method: "setgroups",
  },
  {
    protocol: "node",
    module: "process",
    method: "umask",
  },

  // OS operations
  {
    protocol: "node",
    module: "os",
    method: "userInfo",
  },
  {
    protocol: "node",
    module: "os",
    method: "setPriority",
  },

  // DNS operations
  {
    protocol: "node",
    module: "dns",
    method: "lookup",
  },
  {
    protocol: "node",
    module: "dns",
    method: "lookupService",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolve",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolve4",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolve6",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveMx",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveTxt",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveSrv",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolvePtr",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveCname",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveNs",
  },
  {
    protocol: "node",
    module: "dns",
    method: "resolveSoa",
  },
  {
    protocol: "node",
    module: "dns",
    method: "reverse",
  },

  // Utilities
  {
    protocol: "node",
    module: "util",
    method: "deprecate",
  },
  {
    protocol: "node",
    module: "util",
    method: "promisify",
  },

  // V8 operations
  {
    protocol: "node",
    module: "v8",
    method: "serialize",
  },
  {
    protocol: "node",
    module: "v8",
    method: "deserialize",
  },
  {
    protocol: "node",
    module: "v8",
    method: "writeHeapSnapshot",
  },

  // Worker threads
  {
    protocol: "node",
    module: "worker_threads",
    method: "Worker",
  },

  // Cluster operations
  {
    protocol: "node",
    module: "cluster",
    method: "setupMaster",
  },
  {
    protocol: "node",
    module: "cluster",
    method: "fork",
  },

  // Net operations
  {
    protocol: "node",
    module: "net",
    method: "createServer",
  },
  {
    protocol: "node",
    module: "net",
    method: "createConnection",
  },
  {
    protocol: "node",
    module: "net",
    method: "connect",
  },

  // HTTP operations
  {
    protocol: "node",
    module: "http",
    method: "createServer",
  },
  {
    protocol: "node",
    module: "http",
    method: "request",
  },
  {
    protocol: "node",
    module: "http",
    method: "get",
  },

  // HTTPS operations
  {
    protocol: "node",
    module: "https",
    method: "createServer",
  },
  {
    protocol: "node",
    module: "https",
    method: "request",
  },
  {
    protocol: "node",
    module: "https",
    method: "get",
  },

  // TLS operations
  {
    protocol: "node",
    module: "tls",
    method: "createServer",
  },
  {
    protocol: "node",
    module: "tls",
    method: "connect",
  },
  {
    protocol: "node",
    module: "tls",
    method: "createSecureContext",
  },

  // Zlib operations
  {
    protocol: "node",
    module: "zlib",
    method: "deflateSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "inflateSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "gzipSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "gunzipSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "deflateRawSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "inflateRawSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "brotliCompressSync",
  },
  {
    protocol: "node",
    module: "zlib",
    method: "brotliDecompressSync",
  },

  // Readline operations
  {
    protocol: "node",
    module: "readline",
    method: "createInterface",
  },

  // REPL operations
  {
    protocol: "node",
    module: "repl",
    method: "start",
  },

  // Module operations
  {
    protocol: "node",
    module: "module",
    method: "require",
  },
  {
    protocol: "node",
    module: "module",
    method: "createRequire",
  },

  // Global functions
  {
    protocol: "node",
    module: "global",
    method: "require",
  },
  {
    protocol: "node",
    module: "global",
    method: "JSON.parse",
  },
  {
    protocol: "node",
    module: "global",
    method: "JSON.stringify",
  },
  {
    protocol: "node",
    module: "global",
    method: "parseInt",
  },
  {
    protocol: "node",
    module: "global",
    method: "parseFloat",
  },
  {
    protocol: "node",
    module: "global",
    method: "decodeURI",
  },
  {
    protocol: "node",
    module: "global",
    method: "decodeURIComponent",
  },
  {
    protocol: "node",
    module: "global",
    method: "encodeURI",
  },
  {
    protocol: "node",
    module: "global",
    method: "encodeURIComponent",
  },
];

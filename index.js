const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const babelParser = require("@babel/parser");

// List of file extensions to analyze
const allowedExtensions = [".js", ".jsx", ".ts", ".tsx"];
const excludePatterns = [/\.json$/i, /\.html$/i, /\.css$/i, /\.min\.js$/i, /\.config\.js$/i, /eslint\.config.*\.js$/i];

// Severity levels
const SEVERITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

// Load code smells from a configuration file if available
let customSmellsPath = path.resolve(__dirname, "codeSmells.json");
let codeSmells = [];
if (fs.existsSync(customSmellsPath)) {
  try {
    codeSmells = JSON.parse(fs.readFileSync(customSmellsPath, "utf-8"));
  } catch (err) {
    console.error("Error reading codeSmells.json:", err.message);
    process.exit(1);
  }
} else {
  console.warn(
    "Using default code smells. Provide a `codeSmells.json` file to customize."
  );
  codeSmells = require("./smell");
}

// Recursive function to explore directories
const exploreFolder = (dirPath, files = [], ignore = []) => {
  let entries;
  try {
    entries = fs.readdirSync(dirPath);
  } catch (err) {
    console.error(`Error reading directory: ${dirPath}`, err.message);
    return files;
  }

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && !ignore.includes(entry)) {
      exploreFolder(fullPath, files, ignore);
    } else if (stats.isFile()) {
      const ext = path.extname(fullPath);
      const isAllowedExtension = allowedExtensions.includes(ext);
      const matchesExcludePattern = excludePatterns.some((pattern) =>
        pattern.test(fullPath)
      );

      if (isAllowedExtension && !matchesExcludePattern) {
        files.push(fullPath);
      }
    }
  });

  return files;
};

// Analyze a file for code smells
const analyzeFile = async (filePath, projectRoot) => {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err.message);
    return [];
  }

  // Skip empty files
  if (!content.trim()) {
    console.warn(`Skipping empty file: ${filePath}`);
    return [];
  }

  const lines = content.split("\n");
  const smellsDetected = new Map();

  codeSmells.forEach((smell) => {
    const occurrences = smell.check(lines, filePath, projectRoot); // Pass projectRoot
    occurrences.forEach((occurrence) => {
      const key = `${filePath}-${occurrence.line}-${smell.name}`;
      if (!smellsDetected.has(key)) {
        smellsDetected.set(key, {
          file: filePath,
          line: occurrence.line,
          smell: smell.name,
          description: occurrence.description,
          fix: smell.fix,
          severity: smell.severity,
        });
      }
    });
  });

  return Array.from(smellsDetected.values());
};

// Analyze all files in the project
const analyzeProject = async (files, projectRoot) => {
  let results = [];
  for (const file of files) {
    const fileResults = await analyzeFile(file, projectRoot);
    results = results.concat(fileResults);
  }

  // Check for project-level smells (like Unused Dependency)
  codeSmells.forEach((smell) => {
    if (smell.name === "Unused Dependency") {
      const packageJsonPath = path.join(projectRoot, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const occurrences = smell.check([], packageJsonPath, projectRoot); // Pass projectRoot
        results = results.concat(occurrences);
      }
    }
  });

  return results;
};

// Analyze files concurrently
const analyzeFiles = async (files) => {
  return Promise.all(files.map(analyzeFile));
};

// Generate a detailed report
const generateDetailedReport = (results) => {
  const groupedByFile = results.reduce((acc, r) => {
    acc[r.file] = acc[r.file] || [];
    acc[r.file].push(r);
    return acc;
  }, {});

  const report = [];
  for (const [file, issues] of Object.entries(groupedByFile)) {
    report.push(`FILE: ${file.replace(/\\/g, "/")}`);
    issues.forEach((issue) => {
      report.push(
        ` - [Line ${issue.line}] ${issue.smell} (Severity: ${issue.severity})\n` +
          `   Defect: ${issue.description}\n` +
          `   Solution: ${issue.fix}\n`
      );
    });
  }

  return report.join("\n");
};

// Generate a summary report
const generateSummaryReport = (results) => {
  const totalSmells = results.length;
  const fileCount = new Set(results.map((r) => r.file)).size;
  const averageSmells = (totalSmells / fileCount).toFixed(2);

  let report = [
    "\nSummary Report:",
    "===============",
    `Total Code Smells: ${totalSmells}`,
    `Average Defects Per File: ${averageSmells}`,
    "\nDefects by File:",
  ];

  const groupedByFile = results.reduce((acc, r) => {
    acc[r.file] = acc[r.file] || [];
    acc[r.file].push(r);
    return acc;
  }, {});

  for (const [file, issues] of Object.entries(groupedByFile)) {
    report.push(`${file}: ${issues.length} defects`);
  }

  return report.join("\n");
};

// Main function
const main = async (inputPath, options) => {
  if (!inputPath && options.listSmells) {
    const report = [
      "\nAvailable Code Smells:",
      "====================",
      ...codeSmells.map(
        (smell) => `- ${smell.name} (Severity: ${smell.severity})`
      ),
    ].join("\n");

    if (options.output) {
      const outputPath = path.join(process.cwd(), options.output);
      fs.writeFileSync(outputPath, report);
      console.log(`Report saved to ${outputPath}`);
    } else {
      console.log(report);
    }
    return;
  }

  if (!inputPath || !fs.existsSync(inputPath)) {
    console.error("Invalid or empty path provided!");
    return;
  }

  console.log(`Analyzing path: ${inputPath}`);

  let files = [];
  const stats = fs.statSync(inputPath);
  let projectRoot = inputPath;

  if (stats.isDirectory()) {
    files = exploreFolder(inputPath);
    console.log(`Found ${files.length} files to analyze.`);
    projectRoot = inputPath; // Use the input directory as the project root
  } else if (
    stats.isFile() &&
    allowedExtensions.includes(path.extname(inputPath))
  ) {
    files = [inputPath];
    projectRoot = path.dirname(inputPath); // Use the file's directory as the project root
  } else {
    console.error("Unsupported file type.");
    return;
  }

  if (files.length === 0) {
    console.log("No valid files found to analyze!");
    return;
  }

  const results = await analyzeProject(files, projectRoot);
  if (results.length === 0) {
    console.log("No code smells detected!");
    return;
  }

  let output;
  if (options.listSmells) {
    const detectedSmells = new Set(results.map((r) => r.smell));
    output = [
      "\nDetected Code Smells:",
      "====================",
      ...Array.from(detectedSmells).map((smell) => {
        const count = results.filter((r) => r.smell === smell).length;
        return `- ${smell} (${count} occurrences)`;
      }),
    ].join("\n");
  } else if (options.summary) {
    output = generateSummaryReport(results);
  } else {
    output = generateDetailedReport(results);
  }

  if (options.output) {
    let outputPath = path.join(process.cwd(), options.output);
    fs.writeFileSync(outputPath, output);
    console.log(`Report saved to ${outputPath}`);
  } else {
    console.log(output);
  }
};

// CLI setup
program
  .description("Analyze JavaScript/TypeScript code for code smells.")
  .argument("[path]", "File or Folder path to analyze")
  .option("-r, --report", "Generate a detailed report of all code smells")
  .option("-s, --summary", "Generate a high-level summary report")
  .option(
    "-l, --list-smells",
    "List all available smells or detected smells if path is provided"
  )
  .option("-o, --output <filename>", "Save the output to a file")
  .option("-f, --format", "Format output as JSON or CSV (use with --output)")
  .addHelpText(
    "after",
    `
Examples:
  List all available code smells:
    node index.js --list-smells
    node index.js -l

  Analyze a single file:
    node index.js ./src/file.js --report
    node index.js ./src/file.js -r

  Generate summary for a file:
    node index.js ./src/file.js --summary
    node index.js ./src/file.js -s

  Save output to file:
    node index.js ./src --report --output report.txt
    node index.js ./src -r -o report.txt

  Save formatted output:
    node index.js ./src --report --format --output report.json
    node index.js ./src -r -f -o report.csv
`
  )
  .parse(process.argv);

const filePath = program.args[0];
const options = program.opts();

// Run main function
main(filePath, options).catch((err) => {
  console.error("Error during analysis:", err);
});

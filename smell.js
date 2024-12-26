const fs = require("fs");
const path = require("path");

module.exports = [
  //   // lenghty lines

  //   {
  //     // Name of the code smell
  //     name: "Lengthy Lines",

  //     // Severity level for this code smell
  //     severity: "High",

  //     // Function to check for lines exceeding character limits
  //     check: (lines) => {
  //       const MAX_LENGTH = 100; // Maximum character limit for a line
  //       const WARNING_THRESHOLD = 80; // Warning threshold for character limit
  //       const issues = []; // Array to store detected issues

  //       const tailwindRegex = /class(Name)?=\{?\`[^`]*\`|\{[^}]*\}|"[^"]*"/; // Regex to detect tailwind class attributes
  //       const jsxTagRegex = /<Route\s[^>]*>/;
  //       const commentRegex =
  //         /^\s*(\/\/.*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})\s*$/; // Single-line and block comments
  //       // Iterate through each line of code
  //       lines.forEach((line, idx) => {
  //         const length = line.length; // Calculate the length of the line

  //         // Skip lines containing Tailwind CSS class definitions
  //         if (
  //           tailwindRegex.test(line) ||
  //           jsxTagRegex.test(line) ||
  //           commentRegex.test(line)
  //         ) {
  //           return;
  //         }

  //         // If line length exceeds the maximum allowed length, report an issue
  //         if (length > MAX_LENGTH) {
  //           issues.push({
  //             line: idx + 1, // Line number (1-based index)
  //             description:
  //               `Line exceeds ${MAX_LENGTH} characters (${length} characters).` +
  //               " Consider breaking it into multiple lines for better readability.",
  //           });
  //         }
  //         // If line length exceeds the warning threshold, provide a warning
  //         else if (length > WARNING_THRESHOLD) {
  //           issues.push({
  //             line: idx + 1, // Line number (1-based index)
  //             description: `Line exceeds ${WARNING_THRESHOLD} characters (${length} characters). This is a warning; consider shortening it.`,
  //           });
  //         }
  //       });

  //       return issues; // Return the array of detected issues
  //     },

  //     // Suggested fix for the code smell
  //     fix: "Break lengthy lines into multiple shorter lines or refactor the code for better readability.",
  //   },

  //   //   Long Parameter List

  //   {
  //     // Name of the code smell
  //     name: "Long Parameter List",

  //     // Severity level for this code smell
  //     severity: "Medium",

  //     // Function to check for functions with long parameter lists
  //     check: (lines) => {
  //       const issues = []; // Array to store detected issues

  //       // Regex to detect function declarations and arrow functions
  //       const functionRegex = /function\s+\w*\s*\(([^)]*)\)|\(([^)]*)\)\s*=>/;

  //       // Iterate through each line of code
  //       lines.forEach((line, idx) => {
  //         const match = line.match(functionRegex);

  //         if (match) {
  //           // Extract the parameter list
  //           const params = (match[1] || match[2] || "")
  //             .split(",")
  //             .map((param) => param.trim());

  //           // Check if the number of parameters exceeds 2
  //           if (params.length > 2) {
  //             issues.push({
  //               line: idx + 1, // Line number (1-based index)
  //               description:
  //                 `Function has ${params.length} parameters, which exceeds the recommended limit of 2.` +
  //                 " Consider refactoring the function to use a single configuration object or simplifying the function's responsibilities.",
  //             });
  //           }
  //         }
  //       });

  //       return issues; // Return the array of detected issues
  //     },

  //     // Suggested fix for the code smell
  //     fix: "Refactor the function to use a single configuration object for its parameters or split it into smaller, more specific functions.",
  //   },

  //   //   Nested Callbacks (Callback Hell)

  //   {
  //     name: "Nested Callbacks (Callback Hell)",
  //     severity: "High",
  //     check: (lines) => {
  //       const babelParser = require("@babel/parser");
  //       const issues = []; // Array to store detected issues

  //       const maxAllowedDepth = 3; // Set the threshold for maximum depth
  //       const content = lines.join("\n");
  //       let ast;

  //       try {
  //         // Parse the content to Abstract Syntax Tree (AST) using Babel parser
  //         ast = babelParser.parse(content, {
  //           sourceType: "module", // Handle ES modules
  //           plugins: [
  //             "jsx", // Enable JSX parsing
  //             "typescript", // Support TypeScript if needed
  //             "decorators-legacy", // Support legacy decorators
  //             "classProperties", // Support class properties
  //             "optionalChaining", // Support optional chaining
  //             "nullishCoalescingOperator", // Support nullish coalescing
  //           ],
  //         });
  //       } catch (err) {
  //         console.error("Error parsing file:", err.message);
  //         return [];
  //       }

  //       // Recursive function to traverse AST and check function depth
  //       function detectNestedClosures(
  //         node,
  //         depth = 0,
  //         reportedLines = new Set()
  //       ) {
  //         // Check if the current node is a function
  //         if (
  //           node.type === "FunctionDeclaration" ||
  //           node.type === "FunctionExpression" ||
  //           node.type === "ArrowFunctionExpression"
  //         ) {
  //           depth++; // Increment depth on finding a function
  //           console.log(
  //             `Function found at depth ${depth}, line ${node.loc?.start.line}`
  //           );
  //         }

  //         // If depth exceeds the threshold, report the issue
  //         if (depth > maxAllowedDepth) {
  //           const line = node.loc ? node.loc.start.line : 0; // Use location if available

  //           // Only add the issue if the line hasn't been reported yet
  //           if (!reportedLines.has(line)) {
  //             reportedLines.add(line); // Mark the line as reported
  //             issues.push({
  //               line,
  //               description: `Function nesting exceeds the maximum allowed depth of ${maxAllowedDepth}. Current depth: ${depth}.`,
  //             });
  //           }
  //         }

  //         // Explicitly handle CallExpression nodes to traverse arguments
  //         if (node.type === "CallExpression" && node.arguments) {
  //           node.arguments.forEach((arg) => {
  //             if (
  //               arg.type === "FunctionExpression" ||
  //               arg.type === "ArrowFunctionExpression"
  //             ) {
  //               detectNestedClosures(arg, depth, reportedLines); // Pass reportedLines to avoid duplicates
  //             }
  //           });
  //         }

  //         // Traverse child nodes recursively
  //         if (node.body && Array.isArray(node.body)) {
  //           node.body.forEach((childNode) =>
  //             detectNestedClosures(childNode, depth, reportedLines)
  //           );
  //         } else if (typeof node.body === "object") {
  //           detectNestedClosures(node.body, depth, reportedLines);
  //         }

  //         // Traverse additional keys in the node
  //         for (let key in node) {
  //           if (
  //             key !== "body" &&
  //             key !== "arguments" &&
  //             node[key] &&
  //             typeof node[key] === "object" &&
  //             node[key].type
  //           ) {
  //             detectNestedClosures(node[key], depth, reportedLines);
  //           }
  //         }
  //       }

  //       // Start traversing from the root AST node
  //       detectNestedClosures(ast.program);

  //       return issues; // Return detected issues
  //     },

  //     fix: "Refactor the code to reduce the nesting depth of functions. Consider breaking down the logic into separate functions or using alternatives like Promises or async/await.",
  //   },

  //   //   Variable Re-Assign

  //   {
  //     name: "Variable Re-Assign",
  //     severity: "Medium",
  //     check: (lines) => {
  //       const issues = []; // Array to store detected issues
  //       const variableDeclarations = {}; // Store variable names and their types

  //       // Regex patterns
  //       const declarationPattern = /^(let|const|var)\s+(\w+)\s*=\s*(.*)$/; // Detect variable declarations
  //       const assignmentPattern = /(\w+)\s*=\s*(.*)$/; // Detect re-assignments

  //       // Iterate through each line of code
  //       lines.forEach((line, idx) => {
  //         const trimmedLine = line.trim();

  //         // Check for variable declarations
  //         const declarationMatch = trimmedLine.match(declarationPattern);
  //         if (declarationMatch) {
  //           const [, keyword, varName, value] = declarationMatch;
  //           let type;
  //           try {
  //             type = typeof eval(value); // Determine type of initial value safely
  //           } catch (error) {
  //             type = "unknown"; // If eval fails, mark type as unknown
  //           }

  //           // Store the variable with its type if not already declared
  //           if (!variableDeclarations[varName]) {
  //             variableDeclarations[varName] = {
  //               type: type,
  //               declaredAt: idx + 1, // Line number of declaration
  //             };
  //           }
  //         }

  //         // Check for variable re-assignments
  //         const assignmentMatch = trimmedLine.match(assignmentPattern);
  //         if (assignmentMatch) {
  //           const [, varName, value] = assignmentMatch;

  //           // Check if the variable was previously declared
  //           if (variableDeclarations[varName]) {
  //             const declaredType = variableDeclarations[varName].type;
  //             let newType;
  //             try {
  //               newType = typeof eval(value); // Determine type of reassigned value safely
  //             } catch (error) {
  //               newType = "unknown"; // If eval fails, mark type as unknown
  //             }

  //             // Flag if the type of value has changed
  //             if (declaredType !== newType) {
  //               issues.push({
  //                 line: idx + 1, // Line number (1-based index)
  //                 description: `Variable "${varName}" was declared as "${declaredType}" but reassigned to "${newType}". Consider using a new variable for better readability.`,
  //               });
  //             }
  //           }
  //         }
  //       });

  //       return issues; // Return the array of detected issues
  //     },
  //     fix: "Avoid reassigning variables with a different type. Use descriptive and unique variable names for each purpose to improve code readability and maintainability.",
  //   },

  // Duplicate Code

  //   {
  //     name: "Duplicate Code",
  //     severity: "High",
  //     check: (lines) => {
  //       const babelParser = require("@babel/parser");
  //       const traverse = require("@babel/traverse").default;
  //       const generate = require("@babel/generator").default;
  //       const issues = [];
  //       const content = lines.join("\n");

  //       // Minimum length of code to consider for duplication
  //       const MIN_DUPLICATE_LENGTH = 5;
  //       // Minimum similarity threshold (0-1)
  //       const SIMILARITY_THRESHOLD = 0.8;

  //       let ast;
  //       try {
  //         ast = babelParser.parse(content, {
  //           sourceType: "module",
  //           plugins: [
  //             "jsx",
  //             "typescript",
  //             "decorators-legacy",
  //             "classProperties",
  //             "optionalChaining",
  //             "nullishCoalescingOperator",
  //           ],
  //         });
  //       } catch (err) {
  //         console.error("Error parsing file:", err.message);
  //         return [];
  //       }

  //       // Store code blocks with their locations and content
  //       const codeBlocks = new Map();

  //       // Function to calculate similarity between two strings and return similar parts
  //       function analyzeSimilarity(str1, str2) {
  //         if (str1 === str2) return { similarity: 1.0, matches: [[str1, str2]] };
  //         if (str1.length < MIN_DUPLICATE_LENGTH || str2.length < MIN_DUPLICATE_LENGTH) {
  //           return { similarity: 0.0, matches: [] };
  //         }

  //         // Split into lines for detailed comparison
  //         const lines1 = str1.split('\n');
  //         const lines2 = str2.split('\n');
  //         const matches = [];

  //         // Find matching line sequences
  //         let currentMatch = [];
  //         for (let i = 0; i < lines1.length; i++) {
  //           for (let j = 0; j < lines2.length; j++) {
  //             if (lines1[i].trim() === lines2[j].trim()) {
  //               currentMatch.push([i + 1, j + 1, lines1[i].trim()]);
  //             } else if (currentMatch.length > 0) {
  //               if (currentMatch.length >= 2) { // Only store matches of 2 or more lines
  //                 matches.push([...currentMatch]);
  //               }
  //               currentMatch = [];
  //             }
  //           }
  //         }

  //         // Calculate overall similarity using Levenshtein distance
  //         const longer = str1.length > str2.length ? str1 : str2;
  //         const shorter = str1.length > str2.length ? str2 : str1;
  //         const longerLength = longer.length;
  //         const distance = levenshteinDistance(longer, shorter);
  //         const similarity = (longerLength - distance) / longerLength;

  //         return { similarity, matches };
  //       }

  //       // Levenshtein distance implementation
  //       function levenshteinDistance(str1, str2) {
  //         const matrix = Array(str2.length + 1).fill(null)
  //           .map(() => Array(str1.length + 1).fill(null));

  //         for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  //         for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  //         for (let j = 1; j <= str2.length; j++) {
  //           for (let i = 1; i <= str1.length; i++) {
  //             const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
  //             matrix[j][i] = Math.min(
  //               matrix[j][i - 1] + 1,
  //               matrix[j - 1][i] + 1,
  //               matrix[j - 1][i - 1] + indicator
  //             );
  //           }
  //         }
  //         return matrix[str2.length][str1.length];
  //       }

  //       // Traverse the AST to collect code blocks
  //       traverse(ast, {
  //         enter(path) {
  //           if (
  //             path.node.type === "FunctionDeclaration" ||
  //             path.node.type === "ClassMethod" ||
  //             path.node.type === "ArrowFunctionExpression"
  //           ) {
  //             const { code } = generate(path.node);
  //             if (code.length >= MIN_DUPLICATE_LENGTH) {
  //               const location = path.node.loc?.start.line || 0;
  //               codeBlocks.set(location, {
  //                 code,
  //                 type: path.node.type,
  //                 name: path.node.id?.name || 'anonymous'
  //               });
  //             }
  //           }
  //         }
  //       });

  //       // Compare code blocks for similarity
  //       const processedPairs = new Set();

  //       codeBlocks.forEach((block1, loc1) => {
  //         codeBlocks.forEach((block2, loc2) => {
  //           if (loc1 !== loc2) {
  //             const pairKey = [loc1, loc2].sort().join('-');
  //             if (!processedPairs.has(pairKey)) {
  //               processedPairs.add(pairKey);

  //               const analysis = analyzeSimilarity(block1.code, block2.code);
  //               if (analysis.similarity >= SIMILARITY_THRESHOLD) {
  //                 // Create detailed line mapping information
  //                 const lineMapping = analysis.matches.map(match => {
  //                   return {
  //                     block1Lines: match.map(m => m[0]),
  //                     block2Lines: match.map(m => m[1]),
  //                     code: match.map(m => m[2])
  //                   };
  //                 });

  //                 issues.push({
  //                   line: Math.min(loc1, loc2),
  //                   description: `Duplicate code detected with ${Math.round(analysis.similarity * 100)}% similarity.`,
  //                   details: {
  //                     block1: {
  //                       startLine: loc1,
  //                       type: block1.type,
  //                       name: block1.name
  //                     },
  //                     block2: {
  //                       startLine: loc2,
  //                       type: block2.type,
  //                       name: block2.name
  //                     },
  //                     similarLines: lineMapping,
  //                     message: `Found ${lineMapping.length} similar code segments:\n` +
  //                       lineMapping.map(mapping =>
  //                         `- Lines ${mapping.block1Lines.join(',')} match lines ${mapping.block2Lines.join(',')}:\n  ${mapping.code.join('\n  ')}`
  //                       ).join('\n')
  //                   }
  //                 });
  //               }
  //             }
  //           }
  //         });
  //       });

  //       return issues;
  //     },
  //     fix: "Consider extracting the duplicated code into a reusable function or component. If the duplicated code has slight variations, parameterize the differences. For class-based duplications, consider using inheritance or composition patterns.",
  //   },

  // unused dependency


  {
    name: "Unused Dependency",
    severity: "Medium",
    check: (lines, filePath, projectRoot) => {
      const issues = [];
      const packageJsonPath = path.join(projectRoot, "package.json");
  
      // Check if package.json exists
      if (!fs.existsSync(packageJsonPath)) {
        issues.push({
          line: 0,
          description: "Warning: package.json not found in the target project. Unable to analyze unused dependencies.",
        });
        return issues;
      }
  
      let packageJson;
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      } catch (err) {
        console.error("Error reading package.json:", err.message);
        return issues;
      }
  
      const { dependencies = {}, devDependencies = {} } = packageJson;
      const allDependencies = Object.keys(dependencies);
      const allDevDependencies = Object.keys(devDependencies);
      const allUsedDependencies = new Set();
  
      // Traverse the source files and collect imported/required modules
      const collectImports = (lines) => {
        const importRegex = /import\\s+.*\\s+from\\s+['\"](.*)['\"]/g;
        const requireRegex = /require\\(['\"](.*)['\"]\\)/g;
  
        lines.forEach((line) => {
          let match;
          while ((match = importRegex.exec(line)) !== null) {
            allUsedDependencies.add(match[1]);
          }
          while ((match = requireRegex.exec(line)) !== null) {
            allUsedDependencies.add(match[1]);
          }
        });
      };
  
      collectImports(lines);
  
      // Find unused dependencies
      const unusedDependencies = allDependencies.filter(
        (dep) => !allUsedDependencies.has(dep)
      );
      unusedDependencies.forEach((dep) => {
        issues.push({
          line: 1, // Reporting for the project, not specific to a line in source files
          description: `Dependency "${dep}" is listed in package.json but not used in the codebase. Consider removing it.`,
        });
      });
  
      // Validate devDependencies
      const miscategorizedDevDependencies = allDevDependencies.filter(
        (devDep) => allUsedDependencies.has(devDep)
      );
      miscategorizedDevDependencies.forEach((devDep) => {
        issues.push({
          line: 1,
          description: `Dependency "${devDep}" is used in the codebase but is listed under devDependencies. Consider moving it to dependencies.`,
        });
      });
  
      return issues;
    },
    fix: "Remove unused dependencies from package.json. Ensure that dependencies used only during development are listed under devDependencies, and runtime dependencies are listed under dependencies.",
  },
];

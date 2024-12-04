module.exports = [
    // {
    //   name: "Long Function",
    //   severity: "High",
    //   check: (functionCode) => {
    //     // Split the function code into lines
    //     const lines = functionCode.split("\n");
        
    //     // Filter out empty lines and lines with only whitespace
    //     const meaningfulLines = lines.filter(line => line.trim() !== "");
        
    //     // Return an issue if the number of meaningful lines exceeds the threshold
    //     const maxLines = 50;
    //     return meaningfulLines.length > maxLines
    //       ? [{ line: 1, description: `Function exceeds ${maxLines} lines.` }]
    //       : [];
    //   },
    //   fix: "Refactor the function into smaller, reusable functions.",
    // },    
    // {
    //   name: "Magic Numbers",
    //   severity: "Medium",
    //   check: (lines) => {
    //     const magicNumberRegex = /\b\d+(\.\d+)?\b/; // Matches numeric literals
    //     const allowedNumbers = new Set(["0", "1", "-1"]); // Allowed numbers that are not considered magic
    
    //     return lines
    //       .map((line, idx) => {
    //         const matches = line.match(magicNumberRegex); // Find numeric literals
    //         if (matches) {
    //           const issues = matches
    //             .filter(
    //               (num) =>
    //                 !allowedNumbers.has(num) && !/const|let|var/.test(line) // Exclude allowed and declared constants
    //             )
    //             .map((num) => ({
    //               line: idx + 1,
    //               description: `Magic number '${num}' found. Consider replacing it with a named constant.`,
    //             }));
    
    //           return issues.length > 0 ? issues : null;
    //         }
    //         return null;
    //       })
    //       .flat()
    //       .filter(Boolean); // Remove null or empty entries
    //   },
    //   fix: "Replace magic numbers with named constants for better clarity.",
    // },    
    // {
    //   name: "Nested Loops",
    //   severity: "High",
    //   check: (lines) => {
    //     const matches = [];
    //     lines.forEach((line, idx) => {
    //       if (/(for|while).*\n\s*(for|while)/.test(line)) {
    //         matches.push({ line: idx + 1, description: line.trim() });
    //       }
    //     });
    //     return matches;
    //   },
    //   fix: "Avoid deeply nested loops; use functions or data transformations.",
    // },
    // {
    //   name: "Hardcoded Strings",
    //   severity: "Medium",
    //   check: (lines) =>
    //     lines
    //       .map((line, idx) =>
    //         /["'][^"']*["']/.test(line) && !/import|require/.test(line)
    //           ? { line: idx + 1, description: line.trim() }
    //           : null
    //       )
    //       .filter(Boolean),
    //   fix: "Replace hardcoded strings with constants or configuration.",
    // },
    // {
    //   name: "Unused Variables",
    //   severity: "Low",
    //   check: (lines) =>
    //     lines
    //       .map((line, idx) =>
    //         /\b(let|const)\s+\w+\s*;/.test(line) &&
    //         !new RegExp(line.split(/\s+/)[1]).test(lines.join("\n"))
    //           ? { line: idx + 1, description: line.trim() }
    //           : null
    //       )
    //       .filter(Boolean),
    //   fix: "Remove or use declared variables to avoid unnecessary clutter.",
    // },
    // {
    //   name: "Console Logs in Production",
    //   severity: "Medium",
    //   check: (lines) =>
    //     lines
    //       .map((line, idx) =>
    //         /console\.log/.test(line)
    //           ? { line: idx + 1, description: line.trim() }
    //           : null
    //       )
    //       .filter(Boolean),
    //   fix: "Remove `console.log` or use a proper logging library.",
    // },
    // {
    //   name: "Deeply Nested Conditionals",
    //   severity: "High",
    //   check: (lines) =>
    //     lines
    //       .map((line, idx) =>
    //         /\b(if|else if)\b.*{([^{}]*{[^{}]*})/.test(line)
    //           ? { line: idx + 1, description: line.trim() }
    //           : null
    //       )
    //       .filter(Boolean),
    //   fix: "Simplify nested conditionals with guard clauses or switch statements.",
    // },
    // {
    //   name: "Long Parameter List",
    //   severity: "Medium",
    //   check: (lines) =>
    //     lines
    //       .map((line, idx) =>
    //         /\w+\(.*,.+,.+,.+\)/.test(line)
    //           ? { line: idx + 1, description: line.trim() }
    //           : null
    //       )
    //       .filter(Boolean),
    //   fix: "Group related parameters into objects or use fewer parameters.",
    // },
    // {
    //   name: "Duplicate Code",
    //   severity: "High",
    //   minOccurrences: 3, // Configurable threshold
    //   check: (lines) => {
    //     const duplicates = {};
    //     const results = [];
    
    //     // Identify duplicates
    //     lines.forEach((line, idx) => {
    //       const trimmed = line.trim();
    //       if (trimmed) {
    //         if (!duplicates[trimmed]) {
    //           duplicates[trimmed] = { count: 0, lines: [] };
    //         }
    //         duplicates[trimmed].count++;
    //         duplicates[trimmed].lines.push(idx + 1);
    //       }
    //     });
    
    //     // Filter and format results for lines exceeding the threshold
    //     Object.entries(duplicates).forEach(([code, { count, lines }]) => {
    //       if (count >= this.minOccurrences) {
    //         results.push({
    //           line: lines[0], // First occurrence
    //           description: `Duplicate code found (${count} times): "${code}". Found on lines: ${lines.join(", ")}.`,
    //         });
    //       }
    //     });
    
    //     return results;
    //   },
    //   fix: "Extract duplicate code into reusable functions or constants to improve maintainability.",
    // }
    
    // {
    //   name: "Comments Overuse",
    //   severity: "Low",
    //   check: (lines) => {
    //     const commentRegex = /\/\/|\/\*/; // Compile regex once
    //     const results = [];
    //     for (let i = 0; i < lines.length && results.length < 10; i++) {
    //       const trimmedLine = lines[i].trim();
    //       if (commentRegex.test(trimmedLine)) {
    //         results.push({ line: i + 1, description: trimmedLine });
    //       }
    //     }
    //     return results;
    //   },
    //   fix: "Avoid over-commenting. Let clean code and function names describe functionality.",
    // }
    
    // {
    //   name: "God Class",
    //   severity: "High",
    //   maxLines: 300, // Configurable threshold
    //   check: (lines) => {
    //     if (lines.length > this.maxLines) {
    //       return [
    //         {
    //           line: 1,
    //           description: `Class has ${lines.length} lines, exceeding the limit of ${this.maxLines}.`,
    //         },
    //       ];
    //     }
    //     return [];
    //   },
    //   fix: "Split the class into smaller, more cohesive classes.",
    // }
    
    // {
    //   name: "Improper Error Handling",
    //   severity: "Medium",
    //   check: (lines) => {
    //     const improperCatchRegex = /catch\s*\(.*\)\s*{(\s*})?/; // Regex for empty or improper catch blocks
    //     const results = [];
    
    //     for (let i = 0; i < lines.length; i++) {
    //       const line = lines[i].trim();
    //       if (improperCatchRegex.test(line)) {
    //         results.push({
    //           line: i + 1,
    //           description: `Empty or improper catch block detected: "${line}".`,
    //         });
    //       }
    //     }
    
    //     return results;
    //   },
    //   fix: "Add meaningful error handling logic inside catch blocks, such as fallback mechanisms, detailed error logging, or rethrowing exceptions with context.",
    // }
    
    // {
    //   name: "Global Variables",
    //   severity: "High",
    //   check: (lines) => {
    //     const globalVarRegex = /^\s*var\s+\w+/; // Regex for global `var` declarations at the start of lines
    //     const results = [];
    
    //     for (let i = 0; i < lines.length; i++) {
    //       const line = lines[i].trim();
    //       if (globalVarRegex.test(line)) {
    //         results.push({
    //           line: i + 1,
    //           description: `Potential global variable detected: "${line}".`,
    //         });
    //       }
    //     }
    
    //     return results;
    //   },
    //   fix: "Avoid using global variables. Use block-scoped declarations (`let` or `const`), or encapsulate variables in modules or functions.",
    // }
    
    // {
    //   name: "Large File",
    //   severity: "High",
    //   maxLines: 500, // Configurable threshold
    //   check: (lines) => {
    //     const fileLength = lines.length;
    //     if (fileLength > this.maxLines) {
    //       return [
    //         {
    //           line: 1,
    //           description: `File has ${fileLength} lines, exceeding the limit of ${this.maxLines}. Consider splitting it into smaller, logically grouped files.`,
    //         },
    //       ];
    //     }
    //     return [];
    //   },
    //   fix: "Split the file into smaller files based on logical groupings, such as separating modules, components, or functions.",
    // }
    
    // {
    //   name: "Too Many Imports",
    //   severity: "Medium",
    //   maxImports: 20, // Configurable threshold
    //   check: (lines) => {
    //     const importRegex = /^\s*import/; // Match lines starting with "import"
    //     let importCount = 0;
    
    //     for (let i = 0; i < lines.length; i++) {
    //       if (importRegex.test(lines[i])) {
    //         importCount++;
    //         if (importCount > this.maxImports) {
    //           return [
    //             {
    //               line: 1,
    //               description: `Too many imports (${importCount}) in the file, exceeding the limit of ${this.maxImports}. Consider reducing dependencies or reorganizing imports.`,
    //             },
    //           ];
    //         }
    //       }
    //     }
    
    //     return [];
    //   },
    //   fix: "Reduce the number of imports by reusing modules, reorganizing dependencies, or using index files for grouped exports.",
    // }
    
    // {
    //   name: "Inconsistent Naming Conventions",
    //   severity: "Medium",
    //   conventions: {
    //     variable: /^[a-z][a-zA-Z0-9]*$/, // camelCase
    //     constant: /^[A-Z_]+$/,          // SCREAMING_SNAKE_CASE
    //     function: /^[a-z][a-zA-Z0-9]*$/, // camelCase
    //   },
    //   check: function (lines) {
    //     const defaultConventions = {
    //       variable: /^[a-z][a-zA-Z0-9]*$/,
    //       constant: /^[A-Z_]+$/,
    //       function: /^[a-z][a-zA-Z0-9]*$/,
    //     };
    //     const conventions = this.conventions || defaultConventions;
    
    //     const results = [];
    //     const { variable, constant, function: functionConvention } = conventions;
    
    //     lines.forEach((line, idx) => {
    //       const trimmed = line.trim();
    
    //       if (/const\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed)) {
    //         const [, name] = trimmed.match(/const\s+([a-zA-Z_][\w]*)\s*=/) || [];
    //         if (name && !constant.test(name)) {
    //           results.push({
    //             line: idx + 1,
    //             description: `Constant "${name}" does not follow SCREAMING_SNAKE_CASE.`,
    //           });
    //         }
    //       } else if (/let\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed) || /var\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed)) {
    //         const [, name] = trimmed.match(/(let|var)\s+([a-zA-Z_][\w]*)\s*=/) || [];
    //         if (name && !variable.test(name)) {
    //           results.push({
    //             line: idx + 1,
    //             description: `Variable "${name}" does not follow camelCase.`,
    //           });
    //         }
    //       } else if (/function\s+([a-zA-Z_][\w]*)\s*\(/.test(trimmed)) {
    //         const [, name] = trimmed.match(/function\s+([a-zA-Z_][\w]*)\s*\(/) || [];
    //         if (name && !functionConvention.test(name)) {
    //           results.push({
    //             line: idx + 1,
    //             description: `Function "${name}" does not follow camelCase.`,
    //           });
    //         }
    //       }
    //     });
    
    //     return results;
    //   },
    //   fix: "Ensure consistent naming conventions based on the project standards, such as camelCase for variables, SCREAMING_SNAKE_CASE for constants, and camelCase for functions.",
    // }
    
  ];


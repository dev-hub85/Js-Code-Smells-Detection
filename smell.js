module.exports = [
  {
    name: "Long Function",
    severity: "High",
    check: (lines) => {
      if (!Array.isArray(lines)) {
        throw new TypeError(
          `Expected lines to be an array, but got ${typeof lines}`
        );
      }

      // Filter out empty or whitespace-only lines
      const meaningfulLines = lines.filter((line) => line.trim() !== "");

      // Return an issue if the number of meaningful lines exceeds the threshold
      const maxLines = 50;
      return meaningfulLines.length > maxLines
        ? [{ line: 1, description: `Function exceeds ${maxLines} lines.` }]
        : [];
    },
    fix: "Refactor the function into smaller, reusable functions.",
  },
  {
    name: "Magic Numbers",
    severity: "Medium",
    check: (lines) => {
      const magicNumberRegex = /\b\d+(\.\d+)?\b/; // Matches numeric literals
      const allowedNumbers = new Set(["0", "1", "-1"]); // Allowed numbers that are not considered magic

      return lines
        .map((line, idx) => {
          // Skip numeric literals inside string contexts
          const cleanedLine = line
            .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, "") // Remove string literals
            .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""); // Remove comments

          const matches = cleanedLine.match(new RegExp(magicNumberRegex, "g")); // Find all numeric literals outside strings
          if (matches) {
            const issues = matches
              .filter((num) => {
                // Ensure valid numeric literal
                return (
                  num.trim() !== "" &&
                  !allowedNumbers.has(num) &&
                  !/\b(const|let|var)\b/.test(line) // Exclude allowed and declared constants
                );
              })
              .map((num) => ({
                line: idx + 1,
                description: `Magic number '${num}' found. Consider replacing it with a named constant.`,
              }));

            return issues.length > 0 ? issues : null;
          }
          return null;
        })
        .flat()
        .filter(Boolean); // Remove null or empty entries
    },
    fix: "Replace magic numbers with named constants for better clarity.",
  },
  {
    name: "Hardcoded Strings",
    severity: "Medium",
    check: (lines) => {
      const hardcodedStrings = [];
  
      lines.forEach((line, idx) => {
        // Regular expression to match hardcoded strings
        const regex = /(["'])(?:(?=(\\?))\2.)*?\1/;
  
        // Exclusions:
        if (
          regex.test(line) && // Match quoted strings
          !/(import|require|console|path)/.test(line) && // Exclude imports or requires
          !/^\s*[\w.]+\s*:\s*["'].*["']/.test(line) && // Exclude object properties (`key: "value"`)
          !/<[\w\s.]+=["'].*["']/.test(line) && // Exclude JSX attributes (`<Component prop="value" />`)
          !/\b(className|src|alt|href|id|type|title|name|role|placeholder|data-aos|to|value)\s*=\s*["'].*["']/.test(line) && // Exclude common JSX attributes
          !/const\s+\w+\s*=\s*["'].*["'];?/.test(line) // Exclude simple variable definitions
        ) {
          hardcodedStrings.push({
            line: idx + 1,
            description: line.trim(),
          });
        }
      });
  
      return hardcodedStrings;
    },
    fix: "Replace hardcoded strings with variables, constants or configuration.",
  },
  {
    name: "Unused Variables",
    severity: "Low",
    check: (lines) => {
      const unusedVariables = [];
  
      // Join lines to analyze the full file
      const fullCode = lines.join("\n");
  
      lines.forEach((line, idx) => {
        // Match variable declarations (let, const) and capture variable names
        const match = line.match(/\b(let|const)\s+(\w+)\s*(=[^;]*)?;/);
  
        if (match) {
          const variableName = match[2];
  
          // Check if the variable is unused in the rest of the file
          const usageRegex = new RegExp(`\\b${variableName}\\b`, "g");
          const occurrences = [...fullCode.matchAll(usageRegex)];
  
          // If only one occurrence (the declaration), it is unused
          if (occurrences.length === 1) {
            unusedVariables.push({
              line: idx + 1,
              description: line.trim(),
            });
          }
        }
      });
  
      return unusedVariables;
    },
    fix: "Remove or use declared variables to avoid unnecessary clutter.",
  }
  ,
  {
    name: "Nested Loops",
    severity: "High",
    check: (lines) => {
      const matches = [];
  
      // Stack to track indentation levels
      let loopStack = [];
  
      lines.forEach((line, idx) => {
        // Check if the line contains a loop (for, while)
        const loopMatch = /^(for|while)\s/.test(line.trim());
  
        if (loopMatch) {
          // Check the indentation of the loop to track nesting
          const indentationLevel = line.search(/\S|$/); // Find the first non-whitespace character
  
          if (loopStack.length > 0 && indentationLevel > loopStack[loopStack.length - 1]) {
            // If a loop is nested within another loop, it's a nested loop
            matches.push({ line: idx + 1, description: line.trim() });
          }
  
          // Push the current indentation level to the stack
          loopStack.push(indentationLevel);
        } else {
          // If the line does not contain a loop, reset the indentation stack
          loopStack = loopStack.filter((level, i) => i < loopStack.length - 1);
        }
      });
  
      return matches;
    },
    fix: "Avoid deeply nested loops; use functions or data transformations.",
  },
  {
    name: "Console Logs in Production",
    severity: "Medium",
    check: (lines) =>
      lines
        .map((line, idx) =>
          /console\.log/.test(line)
            ? { line: idx + 1, description: line.trim() }
            : null
        )
        .filter(Boolean),
    fix: "Remove `console.log` or use a proper logging library.",
  },
  {
    name: "Long Parameter List",
    severity: "Medium",
    check: (lines) =>
      lines
        .map((line, idx) =>
          /\w+\(.*,.+,.+,.+\)/.test(line)
            ? { line: idx + 1, description: line.trim() }
            : null
        )
        .filter(Boolean),
    fix: "Group related parameters into objects or use fewer parameters.",
  },
  {
    name: "Comments Overuse",
    severity: "Low",
    check: (lines) => {
      const commentRegex = /\/\/|\/\*/; // Compile regex once
      const results = [];
      for (let i = 0; i < lines.length && results.length < 10; i++) {
        const trimmedLine = lines[i].trim();
        if (commentRegex.test(trimmedLine)) {
          results.push({ line: i + 1, description: trimmedLine });
        }
      }
      return results;
    },
    fix: "Avoid over-commenting. Let clean code and function names describe functionality.",
  },
  {
    name: "God Class",
    severity: "High",
    maxLines: 300, // Configurable threshold
    check: (lines) => {
      if (lines.length > this.maxLines) {
        return [
          {
            line: 1,
            description: `Class has ${lines.length} lines, exceeding the limit of ${this.maxLines}.`,
          },
        ];
      }
      return [];
    },
    fix: "Split the class into smaller, more cohesive classes.",
  },
  {
    name: "Improper Error Handling",
    severity: "Medium",
    check: (lines) => {
      const improperCatchRegex = /catch\s*\(.*\)\s*{(\s*})?/; // Regex for empty or improper catch blocks
      const results = [];
  
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (improperCatchRegex.test(line)) {
          results.push({
            line: i + 1,
            description: `Empty or improper catch block detected: "${line}".`,
          });
        }
      }
  
      return results;
    },
    fix: "Add meaningful error handling logic inside catch blocks, such as fallback mechanisms, detailed error logging, or rethrowing exceptions with context.",
  },
      
  {
    name: "Global Variables",
    severity: "High",
    check: (lines) => {
      const globalVarRegex = /^\s*var\s+\w+/; // Regex for global `var` declarations at the start of lines
      const results = [];
  
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (globalVarRegex.test(line)) {
          results.push({
            line: i + 1,
            description: `Potential global variable detected: "${line}".`,
          });
        }
      }
  
      return results;
    },
    fix: "Avoid using global variables. Use block-scoped declarations (`let` or `const`), or encapsulate variables in modules or functions.",
  },
  {
    name: "Large File",
    severity: "High",
    maxLines: 500, // Configurable threshold
    check: (lines) => {
      const fileLength = lines.length;
      if (fileLength > this.maxLines) {
        return [
          {
            line: 1,
            description: `File has ${fileLength} lines, exceeding the limit of ${this.maxLines}. Consider splitting it into smaller, logically grouped files.`,
          },
        ];
      }
      return [];
    },
    fix: "Split the file into smaller files based on logical groupings, such as separating modules, components, or functions.",
  },
  {
    name: "Too Many Imports",
    severity: "Medium",
    maxImports: 20, // Configurable threshold
    check: (lines) => {
      const importRegex = /^\s*import/; // Match lines starting with "import"
      let importCount = 0;
  
      for (let i = 0; i < lines.length; i++) {
        if (importRegex.test(lines[i])) {
          importCount++;
          if (importCount > this.maxImports) {
            return [
              {
                line: 1,
                description: `Too many imports (${importCount}) in the file, exceeding the limit of ${this.maxImports}. Consider reducing dependencies or reorganizing imports.`,
              },
            ];
          }
        }
      }
  
      return [];
    },
    fix: "Reduce the number of imports by reusing modules, reorganizing dependencies, or using index files for grouped exports.",
  },
  {
    name: "Inconsistent Naming Conventions",
    severity: "Medium",
    conventions: {
      variable: /^[a-z][a-zA-Z0-9]*$/, // camelCase
      constant: /^[A-Z_]+$/,          // SCREAMING_SNAKE_CASE
      function: /^[a-z][a-zA-Z0-9]*$/, // camelCase
    },
    check: function (lines) {
      const defaultConventions = {
        variable: /^[a-z][a-zA-Z0-9]*$/,
        constant: /^[A-Z_]+$/,
        function: /^[a-z][a-zA-Z0-9]*$/,
      };
      const conventions = this.conventions || defaultConventions;
  
      const results = [];
      const { variable, constant, function: functionConvention } = conventions;
  
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
  
        if (/const\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed)) {
          const [, name] = trimmed.match(/const\s+([a-zA-Z_][\w]*)\s*=/) || [];
          if (name && !constant.test(name)) {
            results.push({
              line: idx + 1,
              description: `Constant "${name}" does not follow SCREAMING_SNAKE_CASE.`,
            });
          }
        } else if (/let\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed) || /var\s+([a-zA-Z_][\w]*)\s*=/.test(trimmed)) {
          const [, name] = trimmed.match(/(let|var)\s+([a-zA-Z_][\w]*)\s*=/) || [];
          if (name && !variable.test(name)) {
            results.push({
              line: idx + 1,
              description: `Variable "${name}" does not follow camelCase.`,
            });
          }
        } else if (/function\s+([a-zA-Z_][\w]*)\s*\(/.test(trimmed)) {
          const [, name] = trimmed.match(/function\s+([a-zA-Z_][\w]*)\s*\(/) || [];
          if (name && !functionConvention.test(name)) {
            results.push({
              line: idx + 1,
              description: `Function "${name}" does not follow camelCase.`,
            });
          }
        }
      });
  
      return results;
    },
    fix: "Ensure consistent naming conventions based on the project standards, such as camelCase for variables, SCREAMING_SNAKE_CASE for constants, and camelCase for functions.",
  },
  {
    name: "Duplicate Code",
    severity: "High",
    minOccurrences: 3, // Configurable threshold
    check: (lines) => {
      const duplicates = {};
      const results = [];
  
      // Identify duplicates
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (trimmed) {
          if (!duplicates[trimmed]) {
            duplicates[trimmed] = { count: 0, lines: [] };
          }
          duplicates[trimmed].count++;
          duplicates[trimmed].lines.push(idx + 1);
        }
      });
  
      // Filter and format results for lines exceeding the threshold
      Object.entries(duplicates).forEach(([code, { count, lines }]) => {
        if (count >= this.minOccurrences) {
          results.push({
            line: lines[0], // First occurrence
            description: `Duplicate code found (${count} times): "${code}". Found on lines: ${lines.join(", ")}.`,
          });
        }
      });
  
      return results;
    },
    fix: "Extract duplicate code into reusable functions or constants to improve maintainability.",
  }
];

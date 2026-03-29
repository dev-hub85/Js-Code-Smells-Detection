# 🔍 JavaScript Code Smell Detection System

> An automated tool to detect code smells in JavaScript projects, paired with a full React e-commerce frontend as a real-world test subject for analysis.

---

## 🏗️ Architecture Overview

```
Code Smell Detection System
├── 🔎 Detector  →  Node.js scripts — scans JS/JSX files for code smells
└── 🛒 Frontend  →  React e-commerce app — used as the target codebase for detection
```

---

## 📁 Project Structure

```
├── src/                              # React e-commerce frontend (test subject)
│   ├── components/
│   │   ├── BuyNow.jsx
│   │   ├── callback.jsx
│   │   ├── Carousel.jsx
│   │   ├── Cart.jsx
│   │   ├── CategoryFilters.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderForm.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── products-info.js
│   │   ├── ShowItem.jsx
│   │   └── Testimonial.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── package.json
│
├── smell.js                          # Core smell detection logic
├── allSmells.js                      # Aggregates and runs all smell detectors
├── index.js                          # Entry point — runs the detection pipeline
├── ouput.txt                         # Detection results output
├── out.txt                           # Additional output log
├── file.txt                          # Input/config file
├── package.json                      # Root Node.js dependencies
└── package-lock.json
```

---

## 🧩 Code Smells Detected

The system scans JavaScript and JSX files for common code quality issues, including:

| Code Smell | Description |
|------------|-------------|
| **Long Method** | Functions exceeding a recommended line threshold |
| **Large Component** | React components with too many responsibilities |
| **Too Many Parameters** | Functions with an excessive number of arguments |
| **Duplicate Code** | Repeated logic or identical code blocks |
| **Dead Code** | Unused variables, functions, or imports |
| **Magic Numbers** | Hard-coded numeric values without named constants |
| **Deep Nesting** | Deeply nested conditionals or callbacks |
| **God Component** | A single component handling too much logic |

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 16+ |
| npm | 8+ |

---

## 🚀 Getting Started

### Step 1 — Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Run the Code Smell Detector

```bash
node index.js
```

The detector will scan the `src/` directory and output all detected smells to the console and to `ouput.txt`.

---

## 📊 Sample Output

```
🔍 Scanning: src/components/Cart.jsx
  ⚠️  Long Method detected    → handleCheckout() [42 lines]
  ⚠️  Too Many Parameters     → updateItem(id, qty, price, tax, discount)

🔍 Scanning: src/components/Products.jsx
  ⚠️  Magic Number detected   → line 34: if (items > 25)
  ⚠️  Deep Nesting detected   → renderList() [depth: 4]

✅ Scan complete. 4 smell(s) found across 2 file(s).
   Results saved to → ouput.txt
```

---

## 🗂️ Key Files Explained

| File | Role |
|------|------|
| `index.js` | Entry point — orchestrates the full detection pipeline |
| `allSmells.js` | Registers and runs all individual smell detectors |
| `smell.js` | Core detection logic and smell rule definitions |
| `ouput.txt` | Final report of all detected smells |
| `out.txt` | Verbose / raw detection log |
| `file.txt` | Input configuration or file path list |

---

## 🛒 Frontend (Test Subject)

The `src/` folder contains a React e-commerce application used as the **target codebase** for smell detection. It includes a full component set:

| Component | Description |
|-----------|-------------|
| `Home.jsx` | Landing page |
| `Products.jsx` | Product listing grid |
| `ProductDetails.jsx` | Individual product view |
| `Cart.jsx` | Shopping cart |
| `BuyNow.jsx` | Direct purchase flow |
| `OrderForm.jsx` | Order placement form |
| `CategoryFilters.jsx` | Product filtering by category |
| `Carousel.jsx` | Image carousel / banner |
| `HeroSection.jsx` | Homepage hero banner |
| `Navbar.jsx` | Top navigation bar |
| `Header.jsx` | Page header |
| `Footer.jsx` | Page footer |
| `Contact.jsx` | Contact page |
| `Testimonial.jsx` | Customer testimonials |
| `ShowItem.jsx` | Item preview card |
| `callback.jsx` | Callback / async handler component |
| `products-info.js` | Static product data |

---

## 🛠️ Troubleshooting

**No output generated?**
- Ensure you are running `node index.js` from the root directory
- Confirm `src/` exists and contains `.js` / `.jsx` files

**Module not found errors?**
- Run `npm install` to restore all dependencies

**Smells not detected as expected?**
- Check `smell.js` to review or adjust detection thresholds (e.g. max lines per function, max parameters)

# 🎓 MCA-HUB – MCA Student Learning & Placement Support Platform

<p align="center">
  <strong>A Centralized Learning and Career Support Platform for MCA Students</strong>
</p>

<p align="center">
  <em>Learn • Practice • Prepare • Grow</em>
</p>

---

## 📌 1. About the Project

**MCA-HUB** is a web-based educational platform designed to help Master of Computer Applications (MCA) students access academic resources, improve programming skills, prepare for placements, and practise quantitative aptitude.

The main aim of this project is to bring useful learning materials and student preparation tools into one centralized platform.

Students can access subject-wise study materials, previous examination resources, placement preparation information, coding practice questions, and aptitude formulas through a simple and interactive interface.

MCA-HUB also provides a modern user experience with animations, interactive elements, a 3D background, and a responsive layout.

## 🎯 2. Project Objectives

The main objectives of MCA-HUB are:

- To provide a centralized platform for MCA students.
- To organize academic materials in one place.
- To provide access to notes and previous examination resources.
- To support students in placement preparation.
- To provide coding practice resources.
- To help students prepare for quantitative aptitude tests.
- To make learning resources easy to find and use.
- To create a simple, interactive, and student-friendly website.

## 💡 3. Problem Statement

MCA students often use different websites, folders, and platforms to find study materials, coding questions, placement preparation resources, and aptitude formulas.

Finding and managing these resources separately can take time.

MCA-HUB aims to solve this problem by providing a single platform where students can access different learning and preparation resources in an organized way.

## 🛠️ 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Website design and styling |
| JavaScript | Website functionality and logic |
| Three.js | 3D visual effects |
| HTML Canvas | Animated background effects |
| DOM Manipulation | Updating website content |
| Local Storage | Saving selected progress in the browser |
| CSS Grid and Flexbox | Page layout |
| CSS Animations | Interactive visual effects |
| Google Fonts | Website typography |
| PDF Viewer using iframe | Displaying PDF resources |

**Note:** The original project is developed using HTML, CSS, JavaScript, and Three.js. A separate React migration is planned/in progress; React is not part of the original implementation.

## ✨ 5. Main Features

### 🏠 5.1 Home Page

- Modern landing page.
- Introduction to the MCA-HUB platform.
- Interactive navigation.
- Animated visual background.
- 3D background effects using Three.js.
- Quick access to different learning sections.

### 📚 5.2 Academic Resources

Students can access academic resources in an organized way.

Main features include:

- Subject-wise learning resources.
- Previous examination question papers.
- Study notes.
- Important questions.
- Reference materials.
- Textbook resource support.
- Session-based resource organization.
- Search functionality.
- PDF viewing inside the website.

Students can select a subject and access the available resources.

### 💼 5.3 Placement Dashboard

The Placement Dashboard provides sample placement information and interview preparation resources.

Main features include:

- Placement statistics.
- Total student count.
- Number of placed students.
- Placement percentage.
- Highest package.
- Lowest package.
- Average package.
- Company-wise hiring information.
- Interview questions.
- Search and filter options.
- Student information cards.

**Important:** The current placement dataset contains sample information. The displayed figures are demonstration data, not verified real placement results. Real institutional placement data must be added before public use.

### 💻 5.4 LeetCode Practice

This section helps students practise programming problems.

Main features include:

- Programming problem list.
- Topic-wise problem organization.
- Difficulty-based filtering.
- Search functionality.
- Problem completion tracking.
- Progress display.

Available topic categories include:

- Arrays
- Strings
- Two Pointers
- Sliding Window
- Binary Search
- Stack
- Linked List
- Trees
- Graphs
- Dynamic Programming
- Heap
- Backtracking
- Intervals
- Matrix
- Greedy
- Bit Manipulation
- Design

**Note:** The current LeetCode problem collection is starter/sample data. It is not an official integration with LeetCode.

### 🧮 5.5 Quantitative Aptitude

This section helps students prepare for aptitude examinations and placement tests.

Main features include:

- Topic-wise aptitude organization.
- Important formulas.
- Formula reference files.
- PDF and image-based learning resources.
- Resource viewing and downloading.

Topics include:

1. Divisibility
2. HCF and LCM
3. Simplification
4. Algebra
5. Arithmetic Progression
6. Geometric Progression
7. Permutations and Combinations
8. Probability
9. Average
10. Indices and Surds
11. Percentage
12. Profit and Loss
13. Ratio and Proportion
14. Time and Work
15. Pipes and Cisterns
16. Speed and Distance
17. Trains
18. Boats and Streams
19. Simple Interest
20. Compound Interest
21. Area and Volume
22. Trigonometry
23. Geometry
24. Coordinate Geometry
25. Statistics
26. Mixtures
27. Partnership
28. Clock and Calendar

## 🧠 6. How the Project Works

MCA-HUB follows a frontend-based architecture.

1. The user opens the website.
2. The home page displays the available sections.
3. The user selects a module.
4. JavaScript handles the required actions.
5. The application reads the available resource or sample data.
6. The selected information is displayed on the screen.
7. The user can search, filter, view, or download available resources.
8. Selected learning progress can be saved in browser Local Storage.

## 🏗️ 7. System Architecture

The basic system flow is:

```text
             ┌──────────────────────┐
             │       USER           │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │      MCA-HUB         │
             │     HOME PAGE        │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │   MAIN INTERFACE     │
             │   HTML + CSS + JS    │
             └──────────┬───────────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
  ┌────────────┐ ┌────────────┐ ┌──────────────┐
  │  Academic  │ │ Placement  │ │   LeetCode   │
  │  Resources │ │ Dashboard  │ │   Practice   │
  └────────────┘ └────────────┘ └──────────────┘
        │               │                │
        └───────────────┼────────────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │ Quantitative        │
             │ Aptitude            │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │   JAVASCRIPT LOGIC   │
             │  DATA + PROCESSING   │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │   DISPLAY RESULTS   │
             │   TO THE USER       │
             └──────────────────────┘
```

## 📂 8. Project Folder Structure

The original project is organized as follows:

```text
MCA-HUB/
│
├── index.html
│
├── hubs.js
│
├── aptitude.js
│
├── placements.js
│
├── leetcode.js
│
├── assets/
│   ├── images/
│   ├── academic-resources/
│   ├── quantitative-aptitude/
│   └── other-resource-folders/
│
├── data/
│   └── aptitude.js
│
└── README.txt
```

**Note:** This is a simplified representation of the original project. The exact contents of the `assets` and `data` folders depend on the resources included in the project.

### Important Files

| File | Responsibility |
|---|---|
| `index.html` | Main website structure, styling, and core JavaScript |
| `hubs.js` | Placement, LeetCode, and aptitude module logic |
| `aptitude.js` | Quantitative aptitude resource data |
| `placements.js` | Placement dashboard sample data |
| `leetcode.js` | Coding practice sample data |
| `assets/` | Images, PDFs, and other resources |
| `data/` | Supporting data files |

## ⚙️ 9. Installation and Setup

Follow these steps to run MCA-HUB on your computer.

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### Step 2: Open the Project Folder

```bash
cd MCA-HUB
```

### Step 3: Open in Visual Studio Code

```bash
code .
```

### Step 4: Run the Website

You can use the **Live Server** extension in Visual Studio Code.

1. Open `index.html`.
2. Right-click inside the file.
3. Select **Open with Live Server**.
4. The website will open in your browser.

You can also use another local HTTP server to serve the project files.

**Important:** Run the website through a local server instead of opening the HTML file directly if you want the PDF viewer and browser resource loading to work reliably.

## 🖥️ 10. Requirements

To run this project, you need:

- A computer or laptop.
- A modern web browser.
- Visual Studio Code or another code editor.
- Live Server or another local HTTP server.
- Internet connection for externally hosted libraries and fonts.
- Project resource files such as PDFs and images.

## 🔍 11. Search and Navigation

MCA-HUB provides navigation and search features to help users find resources quickly.

Some keyboard shortcuts supported by the original project include:

| Shortcut | Function |
|---|---|
| `1` or `2` | Open sessional sections |
| `1` to `4` | Select a subject in the relevant resource view |
| `/` | Open search |
| `Esc` | Go back or close the current view |

The exact shortcut behavior depends on the currently active section.

## 💾 12. Data Storage

The original project uses browser Local Storage for selected progress information.

Examples of stored keys:

```javascript
localStorage.setItem("mh-done", value);
localStorage.setItem("mh-last", value);
```

These are used for learning progress and the last-opened resource.

**Limitations of Local Storage:**

- Data is stored in the user's browser.
- Data is not automatically shared across devices.
- Clearing browser storage can remove saved progress.
- There is no central database in the original version.

## 🔐 13. Security and Privacy

The current original project is primarily a frontend application.

It does not include a complete backend authentication system or centralized database.

Before publishing the project:

- Do not add private student information without permission.
- Obtain consent before publishing student photos, phone numbers, or email addresses.
- Replace sample placement data with verified information.
- Avoid adding passwords, API keys, or private credentials to the repository.
- Review uploaded files before making the repository public.

## 🚧 14. Current Project Limitations

The original version has the following limitations:

1. No user login or registration system.
2. No backend server.
3. No centralized database.
4. No administrator dashboard for managing data.
5. No cross-device progress synchronization.
6. Placement statistics are currently sample data.
7. LeetCode questions are starter/sample data.
8. Resource availability depends on the files added to the project.
9. Some external visual resources require an internet connection.

## 🚀 15. Future Enhancements

The project can be improved with the following features:

- React-based frontend migration.
- Backend development.
- Database integration.
- Student registration and login.
- Admin dashboard.
- Real-time placement data management.
- Student profile management.
- More coding practice questions.
- Online aptitude tests.
- Quiz and mock examination system.
- Student performance analytics.
- Notifications and alerts.
- AI-powered learning assistant.
- Mobile-friendly application.
- Cloud-based resource storage.
- Progress synchronization across devices.

These are proposed improvements, not features currently implemented in the original version.

## 🌟 16. Advantages

- Centralized learning resources.
- Easy access to academic materials.
- Organized placement preparation.
- Coding practice support.
- Quantitative aptitude preparation.
- Interactive user interface.
- Simple navigation.
- Browser-based access.
- No installation required for end users.

## 🎓 17. Target Users

MCA-HUB is mainly designed for:

- MCA students.
- Computer Science students.
- Students preparing for technical interviews.
- Students preparing for placement examinations.
- Students who want to practise programming.
- Students who need organized academic resources.

## 📸 18. Screenshots

Add your actual project screenshots in this section.

Example:

```markdown
![Home Page](screenshots/home.png)

![Academic Resources](screenshots/academic-resources.png)

![Placement Dashboard](screenshots/placement-dashboard.png)

![LeetCode Practice](screenshots/leetcode-practice.png)

![Quantitative Aptitude](screenshots/quantitative-aptitude.png)
```

Create a folder named `screenshots` in your repository and add the corresponding image files.

## 👨‍💻 19. Developer

**Project:** MCA-HUB  
**Project Type:** Web-Based Educational Platform  
**Domain:** Education and Computer Applications  
**Development:** Frontend Web Development

## 🤝 20. Contribution

Contributions and suggestions are welcome.

If you want to improve this project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

## 📜 21. License

Choose and add a suitable open-source license before allowing others to reuse or distribute this project.

For example, you can use the MIT License by adding a `LICENSE` file containing the official MIT License text, provided you have the rights to license all included content and assets.

## 🙏 22. Acknowledgements

Thanks to everyone who supported the development and learning process behind this project.

Special thanks to the open-source community and educational platforms that provide learning resources for students.

---

<p align="center">
  <strong>MCA-HUB – One Platform, Multiple Learning Opportunities.</strong>
</p>

<p align="center">
  <em>Learn Today. Build Tomorrow. Achieve More.</em>
</p>

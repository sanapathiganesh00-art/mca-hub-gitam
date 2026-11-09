MCA-HUB  -  how to add files

1) Put the PDF inside the right folder, for example:
   assets/operating-systems/notes/my-new-notes.pdf
2) Open index.html and find the SUBJECTS list. Add one line, for example:
   P("Unit 3 Notes","handwritten • 20 pages",OS+"notes/my-new-notes.pdf","2")
   The last value decides where it shows:
   "1" = Sessional 1,  "2" = Sessional 2,  "12" = both.
   Put the line inside pyqs:[ ... ], notes:[ ... ], imp:[ ... ] or books:[ ... ].
3) Textbooks are not in this zip because they are very large.
   Copy them into the books folders with these exact names:
   assets/discrete-mathematics/books/discrete-mathematics-textbook.pdf
   assets/discrete-mathematics/books/tremblay-discrete-math.pdf
   assets/operating-systems/books/operating-system-concepts.pdf

Open the site with a local server (for example VS Code "Live Server") or upload it
to GitHub Pages, so the PDF viewer works.

Shortcuts: 1 / 2 open Sessional 1 / 2,  1-4 pick a subject,  / search,  Esc go back.

PLACEMENTS and LEETCODE dashboards
  data/placements.js   -> placement numbers, companies, questions, selected students
  data/leetcode.js     -> LeetCode problem list (links)
  assets/placements/   -> photos of selected students (e.g. student1.jpg)
Both files start with SAMPLE data. Replace it with the real data, then set sample:false.
Please get each student's permission before publishing their photo or phone number.

#  MyRead — Online Course Platform Demo

MyRead is a modern, responsive demo online course platform built using HTML, CSS, and JavaScript. It is designed to demonstrate core frontend development skills, including layout design, responsive grids, interactivity, and state management using browser localStorage.

This project is ideal for recruiters or developers to quickly assess your frontend skills: DOM manipulation, component-based rendering, accessibility, responsive design, and clean UI implementation.

# Features

- Course Listings

  - Dynamic grid layout of courses

  - Displays title, description, category, instructor, price, rating, and enrolled students

  - Supports adding new courses dynamically

- Instructor Profiles

  - List of instructors with avatar, name, and title

  - Click on an instructor to view detailed bio

- Search and Filters

   - Search by course title, description, or instructor name

   - Filter courses by category: Web, Data Analytics, Machine Learning, Design

   - Sort by popularity, newest, price ascending/descending

- Enrollment Modal

   - User can enroll in any course via a modal form

   - Data is stored locally using localStorage for demo purposes

   - Enrollments are displayed in a sidebar panel

   - Cancel enrollments easily from the sidebar

- Responsive Design

    - Fully responsive grid for courses and sidebar

    - Optimized for desktop, tablet, and mobile screens

- Theme Toggle

   - Switch between default and alternative color themes using a button

- Accessibility

  - Focus indicators on buttons, inputs, and selects

  - Proper ARIA roles for search and modal dialog

## Project Structure
myread-demo/
│
├── index.html 
├── css/
│   └── styles.css   
├── js/
    └── app.js         

## Technical Details

- Frontend

- State Management: Courses, instructors, and enrollments are stored in localStorage.

- JavaScript: Event handling, and modern JS features.

- Responsive CSS: CSS Grid for layout; media queries for small screens.

- Accessibility: Focus outlines, ARIA labels, semantic HTML.

- Performance: Debounced search input for better performance.

  
## Usage

1. Browse Courses

    - Courses are listed on the left with details like rating, instructor, category, and price.

2. Search & Filter

    - Use the search bar to find courses by keyword.

    - Filter by category and sort by popularity, price, or newest.

3. Enroll in a Course

    - Click Enroll on any course to open the modal.

    - Enter your name and email, then confirm enrollment.

    - Enrollment appears in the sidebar panel.

4. View Instructors

    - Click View Instructor to see detailed instructor bio.

5. Add Sample Course

    - Click Add Sample Course to dynamically add a new course (demo feature).

6. Theme Toggle

    - Click Toggle Theme to switch color scheme for visual demonstration.

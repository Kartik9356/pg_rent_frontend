Markdown
Frontend 🏠

## Tech Stack
* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS (v4.0)
* **Routing:** React Router v6
* **API Calls:** Axios



### Installation

📂 Folder Structure
To keep our code organized, please adhere to the following directory structure inside the src folder:

Plaintext
src/
├── assets/           # Static files like images, icons, and the global index.css
├── components/       # Reusable UI parts (e.g., Navbar.jsx, PropertyCard.jsx, Buttons)
├── pages/            # Main page views (e.g., Home.jsx, Login.jsx, PropertyDetails.jsx)
├── context/          # React Context files for global state (e.g., AuthContext.jsx)
├── services/         # Files connecting to the backend API (e.g., api.js)
├── App.jsx           # Main routing configuration
└── main.jsx          # React application entry point

⚠️ Git Workflow & Rules
To prevent code conflicts and lost work, please follow this strict branching workflow. Do not push directly to the main branch.


<!-- Always pull the latest changes before coding: -->

CMD :: 
git pull origin main
Create a new branch for your work (e.g., if you are building the login page):

CMD :: 
git add .
git commit -m "Added the login UI form"
Push your branch to GitHub:

# Basic User Management Dashboard

This project is a user management dashboard built with Vue.js and Element UI. It features a responsive layout with a sidebar for navigation, a header for actions, and a main content area that displays user data in a table. Users can add, edit, and delete entries using a dialog form.

## 🌱 Features

- **Navigation Menu**: Easy navigation with links to Home, GitHub profile, assignment objectives, and About page.
- **User Data Table**: Displays user information (Name, Email, Phone) with options to view details, edit, or delete.
- **Dialog Form**: A modal dialog for adding and editing user entries with validation.
- **API Integration**: Communicates with a backend API for data management.

## 🔭Installation

### Prerequisites

- Node.js (>= 12.x)
- Vue CLI

### Clone the Repository

```bash
git clone https://github.com/Han-777/832201324-contacts-frontend.git
cd 832201324-contacts-frontend
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run serve
```

Navigate to `http://localhost:8080` in your browser.

## 📫Usage

- **Add Entry**: Click the "Add Entry" button to open the dialog and fill out the form.
- **Edit Entry**: Click "Edit" next to any entry to modify it.
- **Delete Entry**: Click "Delete" to remove an entry from the table.
- **View Details**: Implement detail view logic in the `handleDetail` method as needed.

## 📝API Endpoints

- **GET /user**: Retrieve a list of users.
- **POST /user**: Create a new user entry.
- **PUT /user/:id**: Update an existing user entry.
- **DELETE /user/:id**: Delete a user entry.

Make sure your backend API is running at `http://localhost:8080` for the frontend to function correctly.

## 📄License

This project is licensed under the MIT License. See the LICENSE file for details.

## ⚡Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Element UI](https://element.eleme.io/#/en-US)

Feel free to modify this README file to better suit your project needs!

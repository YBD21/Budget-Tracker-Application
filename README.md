# Budget Tracker Application

## Wireframe
![Budget Tracker Wireframe](https://github.com/YBD21/Budget-Tracker-Application/assets/85655933/dc2099d1-e7e2-4daa-b354-1dfa13ec392e)

## Screenshots

### Login
![Login](https://firebasestorage.googleapis.com/v0/b/budgettracker-7bd72.appspot.com/o/Login.PNG?alt=media&token=856eed89-1f7c-45a0-a20c-a8c8e76a2469)

### Create Account 
![Create Account](https://firebasestorage.googleapis.com/v0/b/budgettracker-7bd72.appspot.com/o/Create%20Account.PNG?alt=media&token=0485273f-205c-4471-bca9-d19f458d2632)

### Home Page
![Home Page](https://firebasestorage.googleapis.com/v0/b/budgettracker-7bd72.appspot.com/o/Home%20Page.PNG?alt=media&token=feb31bb7-a7e8-4b2d-9af6-9b54498200c8)

The Budget Tracker Application is a web-based finance management tool that allows users to keep track of their budget by recording income and expenses. This application is built using React, Tailwind CSS, Express.js, Node.js, Firebase, and Node Mailer. It also includes user authentication functionality, enabling users to securely log in and log out.

## Features

- User Registration and Login: Users can create an account and log in securely to access their budget data.

- Dashboard Overview: Upon logging in, users are presented with a dashboard that provides an overview of their budget, including total income, total expenses, and the balance.

- Add Income and Expenses: Users can add income and expenses to their budget, providing a clear picture of their financial transactions.

- Categorize Transactions: Each income and expense entry allows users to categorize their transactions for better organization and analysis.

- Transaction History: The application maintains a transaction history, allowing users to review and track their financial activities over time.

- Real-time Updates: The budget data is updated in real-time, ensuring users always have the most up-to-date financial information.

- Logout: Users can securely log out of the application to protect their account.

## Online Demo

Check out the online hosted version of the Budget Tracker Application: [https://budgettracker-7bd72.web.app/](https://budgettracker-7bd72.web.app/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/budget-tracker-app.git
cd budget-tracker-app
```

2. Install dependencies for both frontend and backend:

```bash
cd ./Client-App
npm install

cd ./BackEnd-App
npm install
```

3. Set up Firebase and Node Mailer:

   - Create a Firebase project and set up authentication to enable user registration and login.

   - Set up Node Mailer to handle email notifications (e.g., password reset, new user registration).

4. Configure Environment Variables:

   - In the `Client-App` folder, create a `.env` file and set the following variables:

     ```
     VITE_BACKEND_URL = your_localhost_url
     VITE_USER_NAME = your_user_name
     VITE_PASSWORD = your_password_name
     VITE_SECRET_KEY = your_recaptch_secret_Encryption_key
     VITE_RECAPTCHA_KEY = your_recaptch_public_key
     ```

   - In the `BackEnd-App` folder, create a `.env` file and set the following variables:

     ```
     FIREBASE_API_KEY = your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     FIREBASE_APP_ID=your-app-id
     JWT_SECRET_KEY = your_jwt_secret_key 
     MAIL = your_email_address
     MAIL_PASSWORD = your_email_pass
     GOOGLE_SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
     GOOGLE_RECAPTCHA_SECRET_KEY = your_recaptch_secret_key
     ```

5. Run the Application:

   - Start the backend server:

     ```bash
     cd ./BackEnd-App
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd ./Client-App
     npm run dev
     ```

   The application will be accessible at `http://localhost:3000/`.

## Contributing

Contributions to the Budget Tracker Application are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

The Budget Tracker Application is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize the README.md further to include any additional information, instructions, or screenshots related to your specific Budget Tracker Application.
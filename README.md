
# Authentication System

## Overview
**Project Name**: Authentication System  
**Purpose**: A simple system to handle signup, signin, and logout functionalities.  
**Audience**: Interview task for a job application.

### Key Features
- **Signup**: Allows users to create a new account.
- **Signin**: Allows users to log in with existing credentials.
- **Session Management**: Once signed in, a session is maintained using HTTP cookies. Users stay logged in until the cookie expires or they manually log out.
- **Logout**: Allows users to log out of the system.

## Tech Stack
- **Frontend**: React, TypeScript
- **Backend**: NestJS, TypeScript
- **Database**: MongoDB
- **Authentication**: HTTP cookies for session management
- **Containerization**: Docker (with docker-compose)

## Project Structure

```
.
├── auth-service-be
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nest-cli.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.module.ts
│   │   ├── auth
│   │   └── main.ts
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo
├── auth-service-fe
│   ├── README.md
│   ├── docker-compose.yml
│   ├── dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── auth-system.tsx
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yml
```

## Prerequisites
To run this project, you need:
- Docker
- Docker Compose
- A modern browser for accessing the frontend

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yasser-aboelgheit/authentication-system
   cd authentication-system
   ```

2. **Run with Docker Compose**:
   To start the project, use Docker Compose:

   ```bash
   docker-compose up
   ```

   This will start the frontend on `http://localhost:5173` and the backend on `http://localhost:3000`.

## Usage

Once the services are up and running, you can use the following API endpoints:

- **Signin**: `POST http://localhost:3000/auth/signin`
- **Signup**: `POST http://localhost:3000/auth/signup`
- **Logout**: `POST http://localhost:3000/auth/logout`

### Frontend
- The frontend is accessible at `http://localhost:5173`.
- The frontend interacts with the backend for authentication functionality.

## Future Plans
1. **HTTPS**: provides a secure protocol for data transmission over the network..
2. **Password Recovery**: Implement a password reset functionality (e.g., forgot password).
3. **Role Based Access Control**: This type of authorization is used to give certain groups of users certain permissions, for example admins, ops....
4. **UI/UX Improvements**: Improve the user interface and experience, making it more intuitive and user-friendly.




## ScreenShots
![Screenshot 2025-02-03 at 9 19 13 AM](https://github.com/user-attachments/assets/2f5a18f4-098b-4179-b1d9-b5acca04a233)
![Screenshot 2025-02-03 at 9 18 54 AM](https://github.com/user-attachments/assets/ed438ef3-d959-4fb8-9088-2ef115957103)
![Screenshot 2025-02-03 at 9 18 37 AM](https://github.com/user-attachments/assets/6544f16b-a110-4755-90ab-b049c3716747)

# Simple Bank Transaction History App

Welcome to the Simple Bank Transaction History App repository! This project was developed using React, TypeScript, Jest, React Testing Library (RTL), and Sass to create a functional bank transaction history page. Additionally, a continuous integration/continuous deployment (CI/CD) pipeline has been set up using GitHub Actions to automatically deploy the app to Vercel. 

## Features

- **User Selection**: You can select a user to "view this page as." When you choose a user, the app sets the userId parameter in the URL. This allows you to easily share the page with friends, and when they access the link, they will see the same user's transaction history.

- **Current Account Balance**: The app displays the selected user's current account balance with two decimal points of accuracy.

- **Transaction History**: You can view the selected user's transaction history, including incoming and outgoing transactions. The transaction list is paginated and sortable on the client-side for your convenience. Changing pages on the pagination also updates the page parameter in the URL, making it shareable with specific page views.

- **Transaction Search**: You can easily search for specific transactions within the list.
- **Sass Modules**: The project uses Sass modules for styles, providing a structured and maintainable way to manage the application's CSS.

## Deployment

This project utilizes GitHub Actions to automate the CI/CD pipeline. Whenever changes are pushed to the `main` branch, the app is automatically deployed to Vercel. You can access the live version of the app  [here](https://my-bank-app-irinrudko.vercel.app/).

## Technology Stack

This project was built with the following technologies:

- **Vite**: A fast, opinionated web development build tool.
- **React**: A JavaScript library for building user interfaces.
- **Jest**: A JavaScript testing framework.
- **TypeScript**: A typed superset of JavaScript.
- **React Testing Library (RTL)**: A testing utility for React components.
- ***CSS pre-processors (SASS)**: A styling approach that helps organize and modularize CSS.
- **GitHub Actions**: Used for CI/CD to automate the deployment process.
- **Semantic Git Commits**: The project follows semantic commit messages to ensure a clear and structured version history.
- **Vercel**: The chosen deployment platform for the application.

## Repository Structure

- **src**: Contains the source code of the application, including React components, styles, and utility functions.

- **tests**: Houses the unit tests for the components and functions used in the project.

- **public**: Contains the static assets and HTML template for the application.

- **.github/workflows**: Includes GitHub Actions configuration files for CI/CD.


## Getting Started

To run the app locally or make modifications, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `pnpm install` (recommended) or `yarn`.
3. Start the development server with `pnpm run dev` or `yarn dev`.
4. Open your browser and navigate to `http://localhost:5173/` (using pnpm) or `http://localhost:3000` (using yarn) to interact with the app.




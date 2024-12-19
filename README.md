# Employee Management assesstment

- Created by Luiz Augusto Ferrete (l.a.ferrete@gmail.com)

- LinkedIn: https://www.linkedin.com/in/luiz-augusto-ferrete-990713b8/

## Setup and Usage

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
 ```bash
   git clone <repository-url>
   cd employee-maintenance
   npm install
   npm run dev
``` 

If, by any reason, your back-end is running in a port that **is not** *5219*, than you will need to edit the baseURL of the application, by accessing the file located at:
```
employee-maintenance\src\http\index.ts
```

## Project Overview
Project implemented with modular and reusable Vue components, with centralized state management using Pinia. And, as it uses TypeScript, it has strongly typed models for requests and responses.

Custom HTTP class that uses axios, with centralized error handling with custom exceptions and wrapper methods (get, post..) for easy API integrations.

Routing was not used as the project consists of a single page with only a few modals.

## Technologies Used

### Core Tools
- **[Vue 3](https://vuejs.org/)**: Frontend framework for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for robust development.
- **[Vite](https://vitejs.dev/)**: Fast build tool for development and production.
- **[Pinia](https://pinia.vuejs.org/)**: Store library for state management.

### UI Framework
- **[Bootstrap 5](https://getbootstrap.com/)**: CSS framework for responsive design.

### HTTP Communication
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for API interaction.
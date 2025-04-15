# Vial Take Home Assignment

## How to Run
- Create a `.env` file in the root directory and copy the contents of `.env.example`
- Create a `.env` file in the `frontend` directory and add `API_URL=http://localhost:8080`
- Run `docker compose up --build`
- In a separate terminal run 
```bash
npm run migrate
npm run seed
```
This will populate the database with some seed data.
- Go to `localhost:3000` in your browser to test the application.

> [!NOTE]
> If you edit any file on the repo you will immediately see the changes in your browser :D


## Demo
A demo is deployed on: [https://vial-frontend-b.onrender.com/]

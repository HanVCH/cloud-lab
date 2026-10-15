# MERN Docker Lab

Set `MONGODB_URI` to your MongoDB Atlas connection string in a local `.env` file:

```sh
cp .env.example .env
```

Build and start the application from this directory:

```sh
docker compose up -d --build
```

Open the frontend at <http://localhost:3000>. Requests to `/api` are proxied to
the backend container. The backend API is also available on port 5000.

This Codespaces setup uses Docker's default bridge network because the custom
bridge cannot resolve MongoDB Atlas SRV records in this environment. The Compose
link provides the `backend` hostname used by the frontend proxy.

Stop the application with:

```sh
docker compose down
```

The `.env` file is excluded from Git and Docker build contexts. Do not commit
MongoDB credentials.

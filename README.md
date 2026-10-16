# bug-tracker-frontend

This project is the client side portion of my bug tracking application (click this link to view the backend: https://github.com/ZHadjah/BugTracker_Backend). The Bug Tracker is a multi tenant bug tracking application that will allow developers to keep track of issues that arise on their projects.

The client side is written in React and utilizes Antd for the design and Redux for authentication.

![image](https://user-images.githubusercontent.com/114620136/234295751-3a007011-464a-43bf-9f0c-86242b88c04d.png)


# Still in development

## Linting and building

Run `npm run lint` to check application JavaScript with ESLint. Run `npm run build`
to create a production build.

## Initial setup

After cloning the repository, install the project dependencies and Playwright
browsers with:

```sh
npm run setup
```

This runs `npm ci` and installs the Chromium, Firefox, and WebKit browsers used
by the Playwright projects. On Linux, if browser system dependencies are missing,
install them with `npx playwright install --with-deps` (this may require
administrator privileges).

## API configuration and deployment

During local development (`npm start`), API requests go to the local .NET API
at `https://localhost:7110` (the React development server itself runs at
`http://localhost:3000`). Start the backend locally and trust its ASP.NET
development HTTPS certificate. Production builds use `REACT_APP_API_URL`, read
from a root-level `.env` file or the deployment environment. The checked-in
`.env` points to the production Railway API by default.

For Netlify, set `REACT_APP_API_URL` in the site's environment variables to the
backend's public HTTPS origin, for example
`https://bug-tracker-app-production.up.railway.app`, then trigger a new deploy.
Create React App embeds this value at build time; changing the variable requires
a rebuild and redeploy. This URL is public frontend configuration, not a secret.

## Git pre-commit checks

Husky installs the Git hooks when dependencies are installed. Before each commit,
the `.husky/pre-commit` hook runs `npm run lint` and `npm run test:e2e`; either
command failing blocks the commit. Run `npm run setup` once after cloning to
install the Playwright browsers before committing.

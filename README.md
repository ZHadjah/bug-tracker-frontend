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

## Git pre-commit checks

Husky installs the Git hooks when dependencies are installed. Before each commit,
the `.husky/pre-commit` hook runs `npm run lint` and `npm run test:e2e`; either
command failing blocks the commit. Run `npm run setup` once after cloning to
install the Playwright browsers before committing.

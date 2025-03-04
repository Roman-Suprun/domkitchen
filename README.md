# Project name

## Getting started 

1. pnpm install
2. pnpm dev

## Made it possible by

- [next](https://nextjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [tailwind](https://tailwindcss.com/)

## Architecture

Project is based on the [Feature-Sliced Design](https://feature-sliced.design/)


```
.
├── public/
   └── fonts/ (*)

├── src/
    ├── features/ (mostly components that contain business logic, and will be reused)

    ├── widgets/ (components that combine features into meaningful blocks)

    ├── types/ (typescript declaration files)

    ├── providers/ (*)

    ├── entities/ (*)

    ├── views/ (renamed pages folder)

    └── shared/ (shared code)
        ├── constants/

        ├── hooks/

        ├── icons/

        ├── lib/ (utils, helpers)

        ├── ts/ (global types that uses in the application)

        └── ui/ 
```

## Commit messages format

[Commitlint](https://commitlint.js.org/) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

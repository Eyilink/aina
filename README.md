<<<<<<< README.md
# Mon suivi santé

> react-native project (Typescript)

## Technical stack

- react-native
- expo
- react-navigation
- i18n-js
- react-sweet-state ([State management](https://atlassian.github.io/react-sweet-state/))
- date-fns
- react-native-svg-charts

### Pre-requisities

- **Node.js**: In order to install Expo CLI you will need to have Node.js (**we recommend the latest stable version**- but the maintenance and active LTS releases will also work) installed on your computer. [Download the recommended version of Node.js](https://nodejs.org/en/).
- **Expo CLI**: `npm install -g expo-cli`. Verify that the installation was successful by running `expo whoami`. You're not logged in yet, so you will see "Not logged in". You can create an account by running `expo register` if you like, or if you have one already run `expo login`, but you also don't need an account to get started. [installation guide](https://docs.expo.io/get-started/installation/)

### Quick setup

```bash
# Install dependencies
$ yarn install
$ yarn add url 
$ yarn add react-native-modal-datetime-picker
$ yarn add xlsx
$ yarn add @types/xlsx


# Run the app
$ yarn ios
$ yarn android
```

## Available yarn scripts

- `yarn start`: start sthe local development server of Expo CLI
- `yarn ios`: opens the project on iOS
- `yarn android`: opens the project on Android
- `yarn web`: opens the project on Web
- `yarn lint`: runs prettier-eslint on all source files and update them
- `yarn eject`: ejects from Managed Workflow [See Ejecting](https://docs.expo.io/bare/customizing/)

## Available custom components

### AppText / Subtitle / Title

Wraps the React Native Text component. Use this to display body text, subtitle or title in the App.

### Container

Use this in every components on order to display margins and manage the SafeAreaView.

### InputText

A react-native confirmation code field. [documentation](https://github.com/retyui/react-native-confirmation-code-field)

## Code style

This project uses [prettier](https://github.com/prettier/prettier) and [eslint](https://github.com/eslint/eslint) to format the code.

All code pushed to the repository must respect the coding standards enforced by prettier and eslint.

A pre-commit hook will auto-run prettier-eslint at each commit and format the code automatically then include the resulting code in the commit.
This hook is not magic nor meant to replace good coding practices, so code wisely :)

## Structure

All application code must be located in `./src` folder.

For components, please follow the [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

    ├── assets
    ├──── fonts
    ├──── icons
    ├──── images
    ├── components
    ├──── atoms
    ├──── molecules
    ├── constants
    ├── i18n
    ├── navigation
    ├── screens
    ├──── Authenticated
    ├──── Public
    ├── store
    └── styles

Use functional components and hooks whenever possible. Do not use the class syntax.

Styles should be in the same file as the component they are related to. Avoid creating separate "styles.js"
files as it adds to the cognitive charge of having several files to be aware of during development
for the same component and several files with the exact same name in the IDE.

For the same reason, always prefer naming your files with the name of the component and avoid naming everything index.js. Use an index.js file only if you want to hide some implementation or bundle several files as one logical component.
=======
# Mon suivi santé

> react-native project (Typescript)

## Technical stack

- react-native
- expo
- react-navigation
- i18n-js
- react-sweet-state ([State management](https://atlassian.github.io/react-sweet-state/))
- date-fns
- react-native-svg-charts

### Pre-requisities

- **Node.js**: In order to install Expo CLI you will need to have Node.js (**we recommend the latest stable version**- but the maintenance and active LTS releases will also work) installed on your computer. [Download the recommended version of Node.js](https://nodejs.org/en/).
- **Expo CLI**: `npm install -g expo-cli`. Verify that the installation was successful by running `expo whoami`. You're not logged in yet, so you will see "Not logged in". You can create an account by running `expo register` if you like, or if you have one already run `expo login`, but you also don't need an account to get started. [installation guide](https://docs.expo.io/get-started/installation/)

### Quick setup

```bash
# Install dependencies
$ yarn install
$ yarn add url 
$ yarn add react-native-modal-datetime-picker

# Run the app
$ yarn ios
$ yarn android

```

## Available yarn scripts

- `yarn start`: start sthe local development server of Expo CLI
- `yarn ios`: opens the project on iOS
- `yarn android`: opens the project on Android
- `yarn web`: opens the project on Web
- `yarn lint`: runs prettier-eslint on all source files and update them
- `yarn eject`: ejects from Managed Workflow [See Ejecting](https://docs.expo.io/bare/customizing/)

## Available custom components

### AppText / Subtitle / Title

Wraps the React Native Text component. Use this to display body text, subtitle or title in the App.

### Container

Use this in every components on order to display margins and manage the SafeAreaView.

### InputText

A react-native confirmation code field. [documentation](https://github.com/retyui/react-native-confirmation-code-field)

## Code style

This project uses [prettier](https://github.com/prettier/prettier) and [eslint](https://github.com/eslint/eslint) to format the code.

All code pushed to the repository must respect the coding standards enforced by prettier and eslint.

A pre-commit hook will auto-run prettier-eslint at each commit and format the code automatically then include the resulting code in the commit.
This hook is not magic nor meant to replace good coding practices, so code wisely :)

## Structure

All application code must be located in `./src` folder.

For components, please follow the [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

    ├── assets
    ├──── fonts
    ├──── icons
    ├──── images
    ├── components
    ├──── atoms
    ├──── molecules
    ├── constants
    ├── i18n
    ├── navigation
    ├── screens
    ├──── Authenticated
    ├──── Public
    ├── store
    └── styles

Use functional components and hooks whenever possible. Do not use the class syntax.

Styles should be in the same file as the component they are related to. Avoid creating separate "styles.js"
files as it adds to the cognitive charge of having several files to be aware of during development
for the same component and several files with the exact same name in the IDE.

For the same reason, always prefer naming your files with the name of the component and avoid naming everything index.js. Use an index.js file only if you want to hide some implementation or bundle several files as one logical component.

run project : npx expo start -c
>>>>>>> README.md

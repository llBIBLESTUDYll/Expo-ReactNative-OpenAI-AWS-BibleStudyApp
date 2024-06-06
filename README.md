# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.






# Project Setup and Build Instructions

## Prerequisites

Ensure you have the following installed:

- Node.js v22.1.0
- npm (Node Package Manager)

## Node.js Installation

To install Node.js v22.1.0, you can use `nvm` (Node Version Manager):

nvm install 22.1.0
nvm use 22.1.0

## Global Package Installation

Install the necessary global packages:

- npm install -g expo-cli
- npm install -g eas-cli

## Project Setup
Navigate to the source code directory and install dependencies:

- cd path/to/your/project
- npm install

## Running the Project
To run the project for web:

- npm run web

## Building the Project

### Login to Expo
Login to your Expo account:
- expo logout
- expo login

### iOS Build

To build for iOS simulator:
- eas build --platform ios --profile ios-simulator

### Android Build
To build for Android development:

- eas build --platform android --profile development

## Deployment
If the build runs successfully, the project will be available on the Expo Dev site.

### Running on Device
1. After a successful build, a QR code will appear in the terminal.
2. Scan the QR code with your phone's camera.
3. The app will install on your phone.

## Notes
Ensure that your project's root path is correct before running the build commands.
Make sure to have an active internet connection during the build and installation process.

## Useful Links
- [Expo Dev](https://expo.dev/): View our project.
- [Expo CLI Documentation](https://docs.expo.dev/)
- [EAS BUILD Documentation](https://docs.expo.dev/build/introduction/)
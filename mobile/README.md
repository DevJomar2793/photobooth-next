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

## Connect to the local FastAPI backend

1. Start FastAPI from the repository's `backend` folder:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   `0.0.0.0` allows phones on your local network to reach the server. Do not use
   `0.0.0.0` in the mobile API URL.

2. Find your computer's LAN IP address. On macOS with Wi-Fi, run:

   ```bash
   ipconfig getifaddr en0
   ```

3. Create or update `.env.development` in this `mobile` folder. Include the
   FastAPI port:

   ```bash
   EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:8000
   ```

4. Confirm the phone and computer are on the same Wi-Fi network, then open
   `http://YOUR_COMPUTER_IP:8000/` in the phone's browser. It should show the
   message `Photobooth API is running.`

5. Restart Expo and fully reload the app after changing the environment file.
   Expo includes `EXPO_PUBLIC_` values in the JavaScript bundle.

Use a public HTTPS API URL for production builds. The local HTTP address is only
for development on a trusted local network.

## Build an installable Android APK

The production build reads `EXPO_PUBLIC_API_URL` from the Expo `production`
environment. Add the public HTTPS FastAPI address before starting a build:

```bash
npx eas-cli@latest env:set production --name EXPO_PUBLIC_API_URL --value https://YOUR_API_DOMAIN --visibility plaintext
```

Check the project before building:

```bash
npx expo-doctor
npx tsc --noEmit
npx expo lint
```

Then create a standalone APK that can be installed without Expo Go:

```bash
npx eas-cli@latest build --platform android --profile production-apk
```

Download the APK from the build URL and install it on an Android device. Test
the camera, four-photo capture flow, templates, upload, Gallery, download, and
delete features against the production backend.

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

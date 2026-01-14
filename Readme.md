# LMS Assignment

### INSTRUCTIONS TO RUN THE APP

1. Clone the repository
2. Install dependencies using `bun install`
3. Run the app using `bunx expo start -c`
4. For prebuild run `bunx expo prebuild --clean`
5. For making the development build `bunx expo run:android --device`or `bunx expo run:ios --device`

### FLOW

1. APP opens with the home screen
   1.1 After the app opens with the home screen, once the webview ends loading it will trigger a local notification after 5 seconds.
   1.2 After the welcome notification is triggered, again a lesson updated notification will be triggered in 14 seconds, on pressing the notification it will open the video player screen.
   1.3 You can trigger the local notification manually by pressing the buttons in the home screen which will trigger the notification after some delays.
2. Video Player Screen
   2.1 Video Player Screen will have a custom controls for the video (seek, skip, mute) and double tap to forward and backward.
   2.2 Video Player Screen will have a fullscreen button to toggle between fullscreen and normal mode.
   2.3 Video Player Screen will have a quality switcher to switch between different video qualities.

### PACKAGES I'VE USED

1. `expo-video` - For video playback.
2. `expo-screen-orientation` - For orientation handling.
3. `react-native-reanimated` - For smooth animations.
4. `react-native-safe-area-context` - For safe area insets.
5. `@expo/vector-icons` - For icons.
6. `@react-navigation/native` - For navigation.
7. `@react-navigation/native-stack` - For the native stack
8. `react-native-reanimated` - For smooth animations.
9. `@react-native-community/slider` - For custom slider used in the custom controls.
10. `expo-linking` - For deep linking in expo go - exp://IP:PORT/--/video/1 for the production build - test-assignment://video/1
11. `expo-notifications` - For notifications.
12. `expo-screen-orientation` - For orientation handling.
13. `react-native-webview` - For webview here in this assignment i'm rendering the inline html in the webview.
14. `StyleSheet` - used default styleSheet for styling.

## 🚀 Things Implemented

- **WebView**: Implemented `react-native-webview` to render the inline html in the webview.
- **Deep Linking**: Implemented deep linking using `expo-linking` to navigate to the video player screen.
- **Custom Video Player**: Built on top of `expo-video`, featuring a fully custom-built UI for controls (play/pause, seek, fullscreen) and double tap to forward and backward.
- **Fullscreen Handling**: seamless orientation locking and unlocking using `expo-screen-orientation` since we are using custom controls so we needed custom implementation of fullscreen handling with orientation handling to view video in landscope mode.
- **Quality Switching**: Simulated video quality toggle (Auto, 720p, 480p, etc.).
- **Skeleton Loading**: A consistent, animated skeleton loading state using a generic composition pattern `Skeleton` will help in creating the skeleton component for any component.
- **Clean Architecture**: broke the repeated code into reusable component ensuring readability and maintainability with clear separation of concerns only where needed.
- **Notifications**: Implemented `expo-notifications` to trigger local notifications on certain events.

## 📂 Project Structure

The project follows a simple **domain-driven** and **common-components** structure under the `src` directory:

```
src/
├── components/         # Reusable UI components
│   ├── common/         # Generic components (Skeleton, Header, etc.)
│   ├── home/           # Home screen specific components
│   └── video/          # Video player specific components
│   |__ videoScreen/    # Video screen specific components
├── constants/          # Static data and configuration
├── hooks/              # Custom hooks
├── navigation/         # Navigation setup and deep linking config
├── screens/            # Screen components (Home, VideoPlayer)
├── styles/             # Global styles and theme constants
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## THINGS I'VE DELIVERED

1. A working Expo app with two pages
   1.1 WebView + Notifications : ✅
   1.2 Video Player (HLS playback): ✅

2. A short README.md explaining your choices and implementation ✅
3. The app must working fine in Expo Go ✅

### BONUS CHALLENGES I'VE COMPLETED

1. Send a notification when the WebView finishes loading. ✅
2. Make a notification and open the Video Player page when
   tapped. ✅
3. Add custom controls for the video (seek, skip, mute). ✅
4. Allow switching between multiple video streams. ✅

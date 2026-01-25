# run on android

```
bunx expo start --go
```

or

```
bunx expo prebuild
bunx expo run:android
```

# run on web

```
bunx expo start
```

### ✅ After changing:

app.config.ts
Environment variables
Firebase setup
Native plugins
Dependencies
Expo SDK version

```
bunx expo start -c
```

# Build Error? Do this!

---

add this to your build.gradle allprojects -> repositories section

```
        // project specific fix of following Error
        // Could not find any matches for app.notifee:core:+ as no versions of app.notifee:core are available.
        // Searched in the following locations:
        // - https://oss.sonatype.org/content/repositories/snapshots/app/notifee/core/maven-metadata.xml
        // - https://repo.maven.apache.org/maven2/app/notifee/core/maven-metadata.xml
        // - https://dl.google.com/dl/android/maven2/app/notifee/core/maven-metadata.xml
        // - https://www.jitpack.io/app/notifee/core/maven-metadata.xml
        // - file:/home/louis/Documents/Time-Tracker/node_modules/react-native/android/app/notifee/core/maven-metadata.xml
        // - file:/home/louis/Documents/Time-Tracker/node_modules/jsc-android/dist/app/notifee/core/maven-metadata.xml
        maven {
            url "$rootDir/../node_modules/@notifee/react-native/android/libs"
        }
```

---

## 🔥 1. The Nuclear Reset (when nothing works)

This fixes ~80% of “my build never works” cases.

```
bun pm cache rm
rm -rf node_modules
rm -rf ios android
rm -rf ~/.gradle
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf $TMPDIR/metro-*
rm bun.lockb
rm bun.lock
```

then

```
bun install
bunx expo doctor or npx expo-doctor
bunx expo install --check
bunx expo prebuild --clean
# first time run:
bunx expo run:ios   # or run:android
# already run on the device:
bunx expo start --clear
```

# Version History

1.0.0 - first version
1.1.0 - UI-redesign color sheme, button styling and placement.

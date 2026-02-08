<details>
<summary>
run on android
</summary>

```bash
bunx expo start --go
```

or

```bash
bunx expo prebuild
bunx expo run:android
```

---

</details>

<details>
<summary>
run on web
</summary>

```bash
bunx expo start
```

### ✅ After changing:

app.config.ts  
Environment variables  
Firebase setup  
Native plugins  
Dependencies  
Expo SDK version

```bash
bunx expo start -c
```

---

</details>

<details>
<summary>
Build Error? Do this!
</summary>

add this to your android/build.gradle allprojects > repositories section

```Java
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

## 🔥 1. The Nuclear Reset (when nothing works)

This fixes ~80% of “my build never works” cases.

```bash
# 1. Clear Package Manager Cache & Dependencies
bun pm cache rm
rm -rf node_modules
rm bun.lockb
rm bun.lock

# 2. Clear Build Artifacts & Local State
rm -rf ios android
rm -rf .expo
rm -rf ~/.gradle
rm -rf ~/Library/Developer/Xcode/DerivedData

# 3. Clear Metro Bundler Cache
rm -rf $TMPDIR/metro-*

# 4. Reset Watchman (If installed - common culprit for file watching errors)
watchman watch-del-all
```

Then reinstall and rebuild:

```bash
bun install
bunx expo doctor
# or
npx expo-doctor
bunx expo install --check

# Re-generate native folders cleanly
bunx expo prebuild --clean

# First time run (builds the native app):
bunx expo run:android

# Once installed on device, just start the server:
bunx expo start --clear
```

---

</details>

<details>
<summary>
For Store Release
</summary>

### 1. adding the keystore to the project:

add this to your android/app/build.gradle android section

```Java
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('TIMETRACKER_UPLOAD_STORE_FILE')) {
                storeFile file(TIMETRACKER_UPLOAD_STORE_FILE)
                storePassword TIMETRACKER_UPLOAD_STORE_PASSWORD
                keyAlias TIMETRACKER_UPLOAD_KEY_ALIAS
                keyPassword TIMETRACKER_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            shrinkResources (findProperty('android.enableShrinkResourcesInReleaseBuilds')?.toBoolean() ?: false)
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            crunchPngs (findProperty('android.enablePngCrunchInReleaseBuilds')?.toBoolean() ?: true)
        }
    }
```

and add the secrets to your gradle.properties file at the bottom

```
TIMETRACKER_UPLOAD_STORE_FILE=release.keystore
TIMETRACKER_UPLOAD_KEY_ALIAS=release
TIMETRACKER_UPLOAD_STORE_PASSWORD=**********
TIMETRACKER_UPLOAD_KEY_PASSWORD=**********
```

Keystore is in google drive! and needs to go into android/app directory

after adding clean gradle cache

```bash
cd android
./gradlew --stop
./gradlew clean
./gradlew signingReport
```

---

</details>

<details>
<summary>
change sdk Version to latest inside android/build.gradle
</summary>

buildscript > ext section > targetSdkVersion

then build the .aab file

also change the app version inside of app.config.ts > android section

```bash
cd android
./gradlew bundleRelease
```

## you can find the file inside android/app/build/outputs/bundle/release

</details>

<details>
<summary>
first steps after cloning from github
</summary>

1. git clone

2. bun install

3. create .env file and add the variables from firebase

- Go to the Firebase Console.
- Click on your project.
- Click the Gear icon (Settings) next to "Project Overview" in the top left and select Project settings.
- Scroll down to the "Your apps" section.
- Select your Web app (</> icon). If you haven't created one yet, click "Add app" -> Web.
- Under "SDK setup and configuration", select "Config".

```ts
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

---

</details>

### Version History

1.0.0 - first version  
1.1.0 - new UI color sheme, button styling and placement.  
1.2.0 - added pause feature, for manual entries.

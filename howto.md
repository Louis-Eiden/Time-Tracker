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

add this to your android/build.gradle allprojects > repositories section

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

# For Store Releases, these are the steps for adding the keystore to the project:

and this to your android/app/build.gradle android section

```
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
TIMETRACKER_UPLOAD_STORE_FILE=release-key.keystore
TIMETRACKER_UPLOAD_KEY_ALIAS=release-key
TIMETRACKER_UPLOAD_STORE_PASSWORD=***********
TIMETRACKER_UPLOAD_KEY_PASSWORD=***********
```

Keystore is in google drive! and needs to go into android/app directory

after adding clean gradle cache

```
cd android
./gradlew --stop
./gradlew clean
./gradlew signingReport
```

#change sdk Version to latest inside android/build.gradle
buildscript > ext section

then build the .aab file

```
cd android
./gradlew bundleRelease
```

---

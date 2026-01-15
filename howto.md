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

## 🔥 1. The Nuclear Reset (when nothing works)

This fixes ~80% of “my build never works” cases.

```
rm -rf node_modules
rm -rf ios android
rm -rf ~/.gradle
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf $TMPDIR/metro-*
```

then

```
bun install
bunx expo doctor or npx expo-doctor
bunx expo install --check
bunx expo prebuild --clean
bunx expo run:ios   # or run:android
```

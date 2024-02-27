if [ -z "$ANDROID_SDK" ]; then
    echo "Please configure your ANDROID_SDK environment variable"
    exit 1
fi

export PATH=$ANDROID_SDK/platform-tools:$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$ANDROID_SDK/tools/bin:$PATH

if emulator -list-avds | grep -q "local_emulator" ; then
  echo "Emulator already created"
else
  sdkmanager --install "system-images;android-28;google_apis;x86"
  echo "no" | avdmanager --verbose create avd --force --name "local_emulator" --device "pixel" --package "system-images;android-28;google_apis;x86" --tag "google_apis" --abi "x86"
fi

emulator -writable-system -netdelay none -netspeed full -avd "local_emulator"

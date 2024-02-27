if [ -z "$1" ]; then
    echo "Usage: ./bin/configure-local-android-emulator.sh <your-local-ip>"
    exit 1
fi

if [ -z "$ANDROID_SDK" ]; then
    echo "Please configure your ANDROID_SDK environment variable"
    exit 1
fi

export PATH=$ANDROID_SDK/platform-tools:$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$ANDROID_SDK/tools/bin:$PATH

adb root
adb remount
adb pull /system/etc/hosts
echo "$1    local.swacorp.com" >> ./hosts
adb push ./hosts /etc/hosts
adb push ./hosts /etc/system/hosts
adb push ./hosts /system/etc/hosts
rm ./hosts

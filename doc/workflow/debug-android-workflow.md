# Debug Android Workflow

## Steps

- Install Android Studio
- Set your ANDROID_SDK environment variable in your bash_profile
  - `export ANDROID_SDK="/Users/e146671/Library/Android/sdk"`
- In your terminal, navigate to the bin folder
  - `cd bin`
- Get the permission for running the script by sending command
  - `chmod 777 run-local-android-emulator.sh`
- Run the script by sending command
  - `./run-local-android-emulator.sh`
- After running the script, it will start downloading, and then It should open the emulator
  - It will also ask to accept the licence agreement. Hit `Y` to accept
- In a new terminal run the below script (Make sure you are in bin folder)
  - `chmod 777 ./configure-local-android-emulator.sh`
- Get your machine IP address (On Mac, hold `option` key and click on Wi-Fi icon)
- Run the script below. Instead of <your.ip.address> add your machine IP address
  - `./configure-local-android-emulator.sh <your.ip.address>`
- You should see the success message like below
  ````adbd is already running as root
    remount succeeded
    /system/etc/hosts: 1 file pulled, 0 skipped. 0.0 MB/s (56 bytes in 0.002s)
    ./hosts: 1 file pushed, 0 skipped. 0.4 MB/s (90 bytes in 0.000s)
    ./hosts: 1 file pushed, 0 skipped. 0.4 MB/s (90 bytes in 0.000s)
    ./hosts: 1 file pushed, 0 skipped. 0.5 MB/s (90 bytes in 0.000s)```

  ````
- If you didn't get a success message, try running the script one more time
- Restart the emulator by holding (long press) the power icon and selecting the restart button
  - Note: DO NOT quit the emulator and starting it from the command line

## Validate

- In order to make sure your setup was correct, just go to chrome in the emulator and navigate to
  - `http://local.swacorp.com:3000`
- mWeb app should show up

## Usage

- Get the local flavor apk and drag it on to the emulator to install the app
  - NOTE: the local flavor is pointing to dev10
- For debugging the mWeb from emulator, open a tab in Chrome browser on your machine and navigate to
  - `chrome://inspect/`
- From inspect page, select the link that has Southwest Airlines title

## Troubleshoot

- If Android emulator freezes and won't take any touch events, you should restart it from Android Studio
  - `tools > Avd Manager > local emulator > under Actions column > open dropdown menu > Cold Boot Now`
  - You need to run the scripts again after this reboot

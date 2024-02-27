import DeviceInfo from 'src/shared/helpers/deviceInfo';

function deviceClassHelper(elem) {
  const deviceOS = DeviceInfo.os.name;

  if (deviceOS === 'iOS' || deviceOS === 'Android') {
    elem.classList.add(deviceOS.toLowerCase());
    elem.classList.add([deviceOS.toLowerCase(), DeviceInfo.os.version.toLowerCase()].join('--'));
  }
}

export default deviceClassHelper;

import DeviceInfo from 'src/shared/helpers/deviceInfo';

export default function () {
  if (DeviceInfo.os.name === 'Android') {
    window.addEventListener('resize', () => {
      if (document.activeElement.tagName === 'INPUT') {
        window.setTimeout(() => {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  }
}

export default function (originName) {
  const nameFields = originName.split(' ');

  return nameFields.filter((field) => field !== '').join(' ');
}

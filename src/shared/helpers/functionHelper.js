export const someExecute = (functionArray) => (context) => {
  let result;

  for (let i = 0; i < functionArray.length; i++) {
    const functionToExecute = functionArray[i];

    result = functionToExecute(context);

    if (result) {
      break;
    }
  }

  return result;
};

const GenerateErrorPage = () => {
  throw new Error('generated error');

  // eslint-disable-next-line no-unreachable
  return null; // NOSONAR
};

export default GenerateErrorPage;

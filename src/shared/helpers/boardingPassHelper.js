import store from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';

export const setBoardingPassToSession = (viewBoardingPass) =>
  store.session.set(StorageKeys.BOARDING_PASS_DATA_FOR_REFRESH, viewBoardingPass);

export const getBoardingPassFromSession = () => store.session.get(StorageKeys.BOARDING_PASS_DATA_FOR_REFRESH);

export const removeBoardingPassFromSession = () => store.session.remove(StorageKeys.BOARDING_PASS_DATA_FOR_REFRESH);

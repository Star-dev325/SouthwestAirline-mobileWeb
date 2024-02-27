import wcmStyledPage from 'src/wcm/pages/wcmStyledPage';
import {
  retrieveInTheAir,
  retrieveFlyingSouthwest,
  retrieveAtTheAirport,
  retrieveBoardingThePlane,
  retrieveAboutRapidRewards
} from 'src/wcm/actions/wcmActions';

export const InTheAirPage = wcmStyledPage(retrieveInTheAir, 'inTheAir');

export const FlyingSouthwestPage = wcmStyledPage(retrieveFlyingSouthwest, 'flyingSouthwest');

export const AtTheAirportPage = wcmStyledPage(retrieveAtTheAirport, 'atTheAirport');

export const BoardingThePlanePage = wcmStyledPage(retrieveBoardingThePlane, 'boardingThePlane');

export const AboutRapidRewardsPage = wcmStyledPage(retrieveAboutRapidRewards, 'aboutRapidRewards');

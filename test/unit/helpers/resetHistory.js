import { history } from 'src/appHistory';

export default function resetHistory() {
  history.location.pathname = '/';
  history.location.search = '';
  history.location.state = {};
  history.action = 'POP';
}

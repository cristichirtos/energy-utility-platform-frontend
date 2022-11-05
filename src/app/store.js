import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function loggedIn() {
  return cookies.get('currentUser') != null;
}

export function getCurrentUser() {
  return cookies.get('currentUser');
}

export function setCurrentUser(user) {
  user == null ? cookies.remove('currentUser') : cookies.set('currentUser', user, { path: '/' });
}

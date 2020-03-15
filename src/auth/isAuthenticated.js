export default function isAuthenticated() {
  const token = sessionStorage.getItem('IAdopt_session');
  if(token) {
    return true;
  } else {
    return false;
  }
}

export default function ({ redirect, route }) {
  if (route.path === '/') {
    redirect('/dashboard');
  }
}

export default function ({ redirect, route }) {
  const token = localStorage.getItem('admin-token')

  if (!token) {
    return redirect('/login')
  }
}

export default function ({ redirect, route }) {
  if (process.client) {
    const token = localStorage.getItem('admin-token')

    if (!token) {
      return redirect('/login')
    }
  }
}

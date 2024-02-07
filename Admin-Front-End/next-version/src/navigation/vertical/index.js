// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountKey from 'mdi-material-ui/AccountKey'
import Logout from 'mdi-material-ui/Logout'
import Gold from 'mdi-material-ui/Gold'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Keamanan',
      icon: AccountKey,
      path: '/account-settings'
    },
    {
      title: 'Penjualan',
      icon: Gold,
      path: '/penjualan'
    },
    {
      title: 'Logout',
      icon: Logout,
      path: '/login'
    }
  ]
}

export default navigation

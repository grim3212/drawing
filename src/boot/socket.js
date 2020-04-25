import SocketWrapper from '../scripts/socket'
export default async ({ Vue }) => {
  Vue.prototype.$socket = new SocketWrapper()
}

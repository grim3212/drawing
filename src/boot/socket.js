import SocketWrapper from '../scripts/socket'
export default async ({ Vue, router }) => {
  Vue.prototype.$socket = new SocketWrapper(router)
}

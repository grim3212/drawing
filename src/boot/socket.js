import SocketWrapper from '../scripts/socket'
export default async ({ Vue, store, router }) => {
  Vue.prototype.$socket = new SocketWrapper({ store, router })
}

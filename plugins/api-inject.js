import * as wp from '~/services/wp'
import config from '~/nuxt.config'

export default ({ app }, inject) => {
  wp.setRootURL(config.wp.apiRootURL)
  app.$wp = wp
}

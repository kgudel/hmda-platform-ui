import { createUserManager } from 'redux-oidc'

const keycloak = process.env.KEYCLOAK_URL
const app = process.env.APP_URL

const userManager = createUserManager({
  authority: keycloak,
  client_id: 'hmda-api',
  redirect_uri: app + '/oidc-callback',
  silent_redirect_uri: app + '/silent_renew.html',
  post_logout_redirect_uri: app,
  automaticSilentRenew: true,
  scope: 'openid profile',
  response_type: 'id_token token',
  monitorSession: false
})

export default userManager

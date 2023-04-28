import CSRF from 'csrf'

import { csrfSecret } from '$constants/secrets/csrfSecret'
import { eventpopClient } from '$constants/secrets/eventpopClient'

import type { APIRoute } from 'astro'

export const get: APIRoute = async ({ request, redirect }) => {
  const csrfInstance = new CSRF()
  const redirectHint =
    new URL(request.url).hostname === 'localhost' ? 'localhost3000' : 'new'
  const csrfToken = csrfInstance.create(csrfSecret ?? 'demodash')

  const loginURI = `https://www.eventpop.me/oauth/authorize?${new URLSearchParams(
    {
      client_id: eventpopClient.id ?? '',
      redirect_uri:
        'https://dtinth.github.io/oauth_gateway/eventpop_callback.html',
      response_type: 'code',
      state: `${redirectHint}!eventpop-${csrfToken}`,
    }
  ).toString()}`

  return redirect(loginURI, 307)
}

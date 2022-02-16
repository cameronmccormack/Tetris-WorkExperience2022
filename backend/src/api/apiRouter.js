import { ApiRouterBuilder } from './apiRouterBuilder.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'
import { postScoreEndpoint } from './endpoints/postScoreEndpoint.js'

const routerBuilder = new ApiRouterBuilder()
routerBuilder.addGetEndpoint('/', exampleEndpoint)
routerBuilder.addPostEndpoint('/postScore', postScoreEndpoint)

export const apiRouter = routerBuilder.router
import { ApiRouterBuilder } from './apiRouterBuilder.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'
import { postScoreEndpoint } from './endpoints/postScoreEndpoint.js'
import { signUpEndpoint } from './endpoints/signUpEndpoint.js';

const routerBuilder = new ApiRouterBuilder();
routerBuilder.addGetEndpoint('/', exampleEndpoint);
routerBuilder.addPostEndpoint('/postScore', postScoreEndpoint);
routerBuilder.addPostEndpoint('/signUp', signUpEndpoint);

export const apiRouter = routerBuilder.router
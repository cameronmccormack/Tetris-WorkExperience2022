import { ApiRouterBuilder } from './apiRouterBuilder.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'
import { postScoreEndpoint } from './endpoints/postScoreEndpoint.js'
import { signUpEndpoint } from './endpoints/signUpEndpoint.js';
import { signInEndpoint } from './endpoints/signInEndpoint.js';
import { leaderboardEndpoint } from './endpoints/leaderboardEndpoint.js';

const routerBuilder = new ApiRouterBuilder();
routerBuilder.addGetEndpoint('/', exampleEndpoint);
routerBuilder.addPostEndpoint('/postScore', postScoreEndpoint);
routerBuilder.addPostEndpoint('/signUp', signUpEndpoint);
routerBuilder.addPostEndpoint('/signIn', signInEndpoint);
routerBuilder.addGetEndpoint('/leaderboard', leaderboardEndpoint);

export const apiRouter = routerBuilder.router
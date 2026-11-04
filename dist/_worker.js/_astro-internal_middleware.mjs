globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_DqGMPlY3.mjs';
import './chunks/astro/server_BfFI7yxH.mjs';
import { s as sequence } from './chunks/render-context_CTn1Gaq8.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };

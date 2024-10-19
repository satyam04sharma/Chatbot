/**
 * Applies a middleware function to the request and response objects.
 * Converts the middleware function callback into a promise, allowing
 * it to be used with async/await.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param fn - The middleware function to apply.
 * @returns A promise that resolves if the middleware function succeeds.
 */
export const applyMiddleware = (req, res, fn) =>
    new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  
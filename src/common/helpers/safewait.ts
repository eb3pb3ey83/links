export function safeAwait<T>(promise: Promise<T>, finallyFunc?: () => void) {
  return promise
    .then((data) => {
      if (data instanceof Error) {
        return [data]
      }
      return [undefined, data]
    })
    .catch((error) => {
      return [error]
    })
    .finally(() => {
      if (finallyFunc && typeof finallyFunc === 'function') {
        finallyFunc()
      }
    })
}

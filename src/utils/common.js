export function throttle(fn, delay) {
  let start = Date.now()
  return function(...args) {
    let context = this
    let now = Date.now()
    if (now - start > delay) {
      fn.apply(context, args)
      start = now
    }
  }
}

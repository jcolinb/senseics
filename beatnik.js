export const state_init = (init) => ({
  get: () => init,
  set: (next) => init = next
})

export const actions_init = (acts={}) => ({
  sub: (act) => (fn) => acts[act] = fn && act,
  pub: (act) => acts[act]
})

export const pipe = (...fns) => (x) => fns.reduce((a,c)=>c(a),x)

export const share = (...fns) => (x) => fns.map((fn)=>fn(x))

export const trig = (fn) => (x) => fn(x) && x

export const touch = (id) => document.getElementById(id)

export const flip = (fn) => (a) => (b) => fn(b)(a) 

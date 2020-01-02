export const append = (host) => (el) => host.append(el) || host

export const empty = (el) => (!el.firstChild) ? el : el.removeChild(el.firstChild) && empty(el)

export const put = (el) => (host) => host.append(el) || host

export const add_class = (name) => (el) => (el.classList.add(name)) || el

export const txt_box = (txt) => {
  const el = document.createElement('text')
  el.textContent = txt
  return el
}

export const view_init = (obj) => (...msgs) => {
  msgs.reduce((a,c)=>Object.assign(a,{[msg]:a[msg](msg)}),obj)
}

export const pic_box = (url) => {
  const frame = document.createElement('div')
  frame.style.backgroundImage = `url(${url})`
  return add_class('pic-box')(frame)
}

export const mom_box = (...kids) => {
  const mom = document.createElement('div')
  kids.map(append(mom))
  return mom
}


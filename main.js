import {pipe,state_init,touch,actions_init} from './beatnik.js'
import {mom_box,pic_box,add_class,append,txt_box,put} from './elemental.js'

// creates slugs for prototype
const HOME = pipe(
  ()=>mom_box(
    add_class('bold')(txt_box('These are your top line headers.')),
    add_class('p')(txt_box('We can include an arbitrary number of paragraphs...')),
    add_class('p')(txt_box('of arbitrary length, as demonstrated by this over-long run on sentence whose sole function is to demonstrate how arbitrary the length of this sentence is.'))
  ),
  add_class('home-txt'),
  mom_box,
  add_class('home-frame'),
  put(add_class('home-pic')(mom_box(pic_box('assets/diff_circuit.png'))))
)

const ABOUT = pipe(
  ()=>txt_box('this will be a more detailed description of the company and other info that doesn\'t fit on the homepage'),
  add_class('p')
)

const CONTACT = pipe(
  ()=>txt_box('this will include pictures of employees and ways of contacting them'),
  add_class('p')
)

// load views behind getters
const views = {
  HOME,
  ABOUT,
  CONTACT
}

// one-offs to remove old content
const remove = (host) => (el) => host.removeChild(el)

// animation controls
const fade_in = add_class('fade-in')
const fade_out = add_class('fade-out')

// state containers for current view and menu
const state = state_init(views.HOME())
const menu_state = state_init(false)

// main render which controls view switch and animation
const render = (next) => pipe(
  toggle_menu,
  state.get,
  fade_out,
  remove(touch('display')),
  views[next], // pipe 'breaks' here as we switch to out view getter
  add_class(next),
  state.set,
  fade_in,
  append(touch('display'))
)

const toggle_menu = pipe(
  menu_state.get,
  (s)=>!s,
  menu_state.set,
  (s)=>(s)
      ? add_class('open')(touch('menu-drawer')) && touch('menu-drawer').classList.remove('close')
      : add_class('close')(touch('menu-drawer')) && touch('menu-drawer').classList.remove('open'))

// utilities to control animation on menu items

const update_menu = (next) => () => touch('tab').textContent = next

// main actions which link up click events to their views
const acts = actions_init({HOME:render('HOME'),ABOUT:render('ABOUT'),CONTACT:render('CONTACT'),menu:toggle_menu})

// tap into click events and translate to proper action; pipe break with switch to action getter
const tap = (k) => touch(k).addEventListener('click',pipe(update_menu(k),acts.pub(k)))

// tap into menu items
tap('menu')
tap('HOME')
tap('ABOUT')
tap('CONTACT')

// initialize our view to home view
pipe(state.set,add_class('fade-in'),append(touch('display')))(views.HOME())
add_class('fade-in')(touch('HOME'))


import {mom_box,pic_box,txt_box,add_class,append} from './elemental.js'
import {pipe,flip} from './beatnik.js'

const p = pipe(txt_box,add_class('txt'))

const out_class = flip(add_class)

const about_txt = mom_box(
  p('Senseics is an lor ip etc...'),
  p('located in Columbus,OH etc...'),
  p('years of etc...')
)

const about_pic = mom_box(pic_box('assets/diff_circuit.png'))

// export const about = () => mom_box(add_class('about-txt')(about_txt),add_class('about-pic')(about_pic))

export const about = () => about_txt

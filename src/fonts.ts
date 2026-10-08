import { loadFont as loadFredoka } from '@remotion/google-fonts/Fredoka'
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans'
import { loadFont as loadOswald } from '@remotion/google-fonts/Oswald'

/** Font gratis (Google Fonts, lisensi OFL). Display = judul bulat ala poster. */
export const FONT = {
  display: loadFredoka('normal', { weights: ['600', '700'], subsets: ['latin'] }).fontFamily,
  body: loadJakarta('normal', { weights: ['500', '700', '800'], subsets: ['latin'] }).fontFamily,
  banner: loadOswald('normal', { weights: ['600'], subsets: ['latin'] }).fontFamily,
}

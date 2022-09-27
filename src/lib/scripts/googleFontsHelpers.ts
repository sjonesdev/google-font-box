const FETCH_FONT_LIST_URL = 'https://www.googleapis.com/webfonts/v1/webfonts'
const FETCH_FONT_CSS_URL = 'https://fonts.googleapis.com/css2'
const API_KEY = '?key=AIzaSyAhVzIbyS8zG1Su0xTTZ1jbCqLkAO_HMm0'


/* Types */

type FontKind = 'webfonts#webfont' | 'websafe';
type FontCategory = 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy'

interface Font {
  family: string
  variants: Array<string> //Array<FontVariant>
  subsets: Array<string>
  version: string
  lastModified: string
  files: {[Property in keyof typeof FontVariants]?: string} // list of URLs corresponding to string values in variants array
  category: FontCategory
  kind: FontKind
}

// get names via reverse mapping, i.e. FontVariants['100'] === "Thin"
const FontVariants = {
  Thin: "100",
  ExtraLight: "200",
  Light: "300",
  Regular: "regular",
  Medium: "500",
  SemiBold: "600",
  Bold: "700",
  ExtraBold: "800",
  Black: "900",
  ThinItalic: "100italic",
  ExtraLightItalic: "200italic",
  LightItalic: "300italic",
  RegularItalic: "italic",
  MediumItalic: "500italic",
  SemiBoldItalic: "600italic",
  BoldItalic: "700italic",
  ExtraBoldItalic: "800italic",
  BlackItalic: "900italic"
}
const FontVariantNames: {[index: string]: string} = {};
let name: keyof typeof FontVariants
for(name in FontVariants) {
  const variant = FontVariants[name]
  FontVariantNames[variant] = name;
}

export const fonts: {[index: string]: Font} = {};

const webSafeFonts: Array<[string, FontCategory]> = [
  ['Helvetica', 'sans-serif'],
  ['Arial', 'sans-serif'],
  ['Arial Black', 'sans-serif'],
  ['Verdana', 'sans-serif'],
  ['Tahoma', 'sans-serif'],
  ['Trebuchet MS', 'sans-serif'],
  ['Impact', 'sans-serif'],
  ['Gill Sans', 'sans-serif'],
  ['Times New Roman', 'serif'],
  ['Georgia', 'serif'],
  ['Palatino', 'serif'],
  ['Baskerville','serif'],
  ['Andalé Mono', 'monospace'],
  ['Courier', 'monospace'],
  ['Lucida', 'monospace'],
  ['Monaco', 'monospace'],
  ['Bradley Hand', 'cursive'],
  ['Brush Script MT','cursive'],
  ['Luminari','fantasy'], 
  ['Comic Sans MS','cursive'],
]

for(const font of webSafeFonts) {
  fonts[font[0]] = {
    family: font[0],
    variants: ['latin'],
    subsets: [
      '100', '100italic',
      '200', '200italic',
      '300', '300italic',
      'regaular', 'italic',
      '500', '500italic',
      '600', '600italic',
      '700', '700italic',
      '800', '800italic',
      '900', '900italic'
    ],
    version: 'n/a',
    lastModified: 'n/a',
    files: {},
    category: font[1],
    kind: 'websafe'
  }
}

type FontSearchResults = {fontNames: Array<string>, url: string | null}


/* Functions */

let gotFonts = false;
export default async function initGoogleFontsHelper() {
  return await fetch(FETCH_FONT_LIST_URL + API_KEY)
    .then((res) => res.json())
    .then((data) => {
      console.log("Successfully fetched fonts data", data)
      const fetchedFonts: [Font] = data["items"]
      for(const font of fetchedFonts) fonts[font.family] = {...font};
      gotFonts = true;
      console.log("fetched font info", fonts);
      const variants: {[index: string]: boolean} = {};
      for(const font in fonts) {
        for(const variant of fonts[font].variants) variants[variant] = true
      }
      console.log("variants available: ", variants);
      return true;
    }).catch((reason) => {
      console.log(`couldn't init google fonts, reason: ${reason}`)
      return false;
    });
}

function getInitDone() {
  return gotFonts;
}

/**
 * Gets URL to stylesheet for Google Fonts to display
 * @param nameIncludes String to look for existence of in font names
 * @param limit Limit of how many fonts to put in URL (default 10)
 * @returns URL string to the fonts stylesheet if found fonts, empty 
 * string if no matching fonts, or null if fonts haven't been fetched
 */
function searchFonts(nameIncludes: string, limit=10): FontSearchResults {
  if(!gotFonts) return {fontNames: [], url: null};
  const fontNames: Array<string> = [];
  let gFontsAdded = 0;
  let url = FETCH_FONT_CSS_URL;
  let added = 0;
  for(const fontName in fonts) {
    if(fontName.toLowerCase().includes(nameIncludes.toLowerCase())) {
      fontNames.push(fontName)
      if(fonts[fontName].kind === 'webfonts#webfont'){
        const parsedName = fontName.replaceAll(' ', '+')
        if(gFontsAdded === 0) {
          url += `?family=${parsedName}` //TODO - replace space with +
        } else {
          url += `&family=${parsedName}` //TODO - replace space with +
        }
        gFontsAdded++;
      }
      added++
      if(added == limit) break
    }
  }
  if(gFontsAdded === 0) { // no google fonts found, don't fetch
    url = ''
  } else {
    url += "&display=swap";
  }
  return { fontNames, url }
}

function getFontLink(fontName: string): string | null {
  if(fonts[fontName]) {
    if(fonts[fontName].kind === 'websafe') return "";
    return FETCH_FONT_CSS_URL + `?family=${fontName.replaceAll(' ', '+')}` + '&display=swap';
  }
  return null;
}

export { initGoogleFontsHelper, getInitDone, searchFonts, getFontLink, FontVariants }
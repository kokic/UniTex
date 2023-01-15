
import Proper from './src/utils/proper.js'
import Unicode from './src/utils/unicode.js'

import Binary from './src/macro/binary.js'
import Unary from './src/macro/unary.js'
import Fixed from './src/macro/fixed.js'
import Environment from './src/macro/environment.js'

import Parser from './src/parsec.js'

const token = predicate => new Parser(
  source => source.length > 0
    ? predicate(source[0])
      ? [source[0], source.substring(1)]
      : undefined
    : undefined
)
const character = char => token(x => x == char)

const string = str => new Parser(
  source => source.length > 0
    ? source.startsWith(str)
      ? [str, source.substring(str.length)]
      : undefined
    : undefined
)

const digit = token(x => x.boundedIn('0', '9'))


/*
const digits = digit.plus()

const add = digits.follow(token(x => x == '+')).follow(digits)
console.log(add.parse('10+33*2'))



*/


const letter = token(Unicode.isLetter)
const letters = letter.plus()


const backslash = character('\\')

const lbrace = character('{')
const rbrace = character('}')
const braceWrap = x => lbrace.follow(x).skip(rbrace).second()

const space = character(' ')
const spacea = space.asterisk()
// const spaces = space.plus()

const loose = x => spacea.follow(x).second()
const single = digit.or(letter).or(() => fixedMacro)
const value = loose(single.or(braceWrap(() => text)))




const macroName = letters.or(lbrace).or(rbrace).or(backslash)
  .or(token(x => x == ',' || x == '.' || x == '\\'))

const macroh = backslash.follow(macroName).second()
const fixedMacro = macroh.check(x => Fixed[x]).map(x => Fixed[x]) // `\\${x}`
// [macro, value]
const unaryMacro = macroh.check(x => Unary[x])
  .follow(value)
  .map(xs => Unary[xs[0]](xs[1]))
// [[macro, value1], value2]
const binaryMacro = macroh.check(x => Binary[x])
  .follow(value)
  .follow(value)
  .map(xs => Binary[xs[0][0]](xs[0][1], xs[1]))

const special = x => x == '\\'
  || x == '{' || x == '}'
  || x == '_' || x == '^'
  || x == '%'

const envira = braceWrap(letters)
const begin = backslash.skip(string('begin')).follow(envira).second()
const end = backslash.skip(string('end')).follow(envira).second()
// [[begin, text], end]
const environ = begin.follow(() => section).follow(end)
  .check(xs => xs[0][0] == xs[1])
  .map(xs => Environment[xs[1]](xs[0][1]))
//

const supscript = character('^').follow(value).second()
  .map(x => Unicode.supscripts[x] || '^' + Proper.brace(x))
const subscript = character('_').follow(value).second()
  .map(x => Unicode.subscripts[x] || '_' + Proper.brace(x))
const suporsub = supscript.or(subscript)


const comment = character('%')
  .skip(token(x => x != '\n').asterisk())
  .skip(character('\n'))
  .map(x => '')

/** 
 * because there is a simplified version of 
 * the theorem style (as fixed macro), it is 
 * necessary to ensure that the environment 
 * takes precedence over those macros. 
 *
 */
const element = token(x => !special(x)).plus()
  .or(comment)
  .or(suporsub)
  .or(environ)
  .or(fixedMacro)
  .or(unaryMacro)
  .or(binaryMacro)
//
const section = element.plus()

/*
console.log(environ.parse(String.raw`\begin{bmatrix} 
  0 & 1 \\ 
  1 & 0 
\end{bmatrix}`))
*/

const unknownMacro = macroh.map(x => '\\' + x)


const text = element.or(unknownMacro).plus()





// import fs from 'fs'

// const read = path => fs.readFileSync(path, 'utf8')

// const state = text.parse(read('./test/modular.tex'))
// state && console.log(state[0])




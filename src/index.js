import tachyons from 'tachyons-js';
import { compact, flatten, words, isNumber, isNaN } from 'lodash';
import { _ } from 'param.macro';

function lexer(stringWithSpace) {
	return compact(stringWithSpace.split(/\s/));
}

const getTachyons = tachyons[_];
const snakeCase = words(_).reduce(
	(result, word, index) =>
		result +
		do {
			const followUpIsNumber = isNumber(Number(word)) && !isNaN(Number(word));
			if (followUpIsNumber || !(index > 0)) {
				('');
			} else {
				('_');
			}
		} +
		word.toLowerCase(),
	''
);
function getTachyonsCSS(shorthand) {
	return shorthand |> snakeCase |> getTachyons;
}

function mapTachyonsFragmentToCSSInJS(fragment) {
	return lexer(fragment).map(getTachyonsCSS);
}

/** Return a function that receives styled-components' props, and return an array of CSS-in-JS likes:
 * [ { padding: 'var(--spacing-medium)' },
  { '@media screen and (min-width: 30em)': { padding: 'var(--spacing-extra-large)' } } ]
 */
export default function ty(tachyonsClassNameStrings, ...args) {
	const mapPropsToCSSInJS = props =>
		flatten(
			tachyonsClassNameStrings.map((fragment, index) => {
				/** get tachyons css from template literal */
				const cssFromString = mapTachyonsFragmentToCSSInJS(fragment);
				/** get tachyons css string from what's inside ${xxx} */
				const cssFromVariable = do {
					if (typeof args[index] === 'function') {
						mapTachyonsFragmentToCSSInJS(args[index](props));
					} else if (typeof args[index] === 'string') {
						mapTachyonsFragmentToCSSInJS(args[index]);
					} else {
						[];
					}
				};
				return [...cssFromString, ...cssFromVariable];
			})
		);

	return mapPropsToCSSInJS;
}

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

export const tachyonsVariables = `
	:root {
		--black: #000;
		--near-black: #111;
		--dark-gray: #333;
		--mid-gray: #555;
		--gray: #777;
		--silver: #999;
		--light-silver: #aaa;
		--moon-gray: #ccc;
		--light-gray: #eee;
		--near-white: #f4f4f4;
		--white: #fff;

		--dark-red: #f00008;
		--red: #ff3223;
		--orange: #f3a801;
		--gold: #f2c800;
		--yellow: #ffde37;
		--purple: #7d5da9;
		--light-purple: #8d4f92;
		--hot-pink: #d62288;
		--dark-pink: #c64774;
		--pink: #f49cc8;
		--dark-green: #006c71;
		--green: #41d69f;
		--navy: #001b44;
		--dark-blue: #00449e;
		--blue: #357edd;
		--light-blue: #96ccff;
		--lightest-blue: #cdecff;
		--washed-blue: #f6fffe;
		--washed-green: #e8fdf5;
		--washed-yellow: #fff8d5;
		--light-pink: #efa4b8;
		--light-yellow: #f3dd70;
		--light-red: #ffd;

		--transparent: transparent;

		--black-90: rgba(0, 0, 0, 0.9);
		--black-80: rgba(0, 0, 0, 0.8);
		--black-70: rgba(0, 0, 0, 0.7);
		--black-60: rgba(0, 0, 0, 0.6);
		--black-50: rgba(0, 0, 0, 0.5);
		--black-40: rgba(0, 0, 0, 0.4);
		--black-30: rgba(0, 0, 0, 0.3);
		--black-20: rgba(0, 0, 0, 0.2);
		--black-10: rgba(0, 0, 0, 0.1);
		--black-05: rgba(0, 0, 0, 0.05);
		--black-025: rgba(0, 0, 0, 0.025);
		--black-0125: rgba(0, 0, 0, 0.0125);

		--white-90: rgba(255, 255, 255, 0.9);
		--white-80: rgba(255, 255, 255, 0.8);
		--white-70: rgba(255, 255, 255, 0.7);
		--white-60: rgba(255, 255, 255, 0.6);
		--white-50: rgba(255, 255, 255, 0.5);
		--white-40: rgba(255, 255, 255, 0.4);
		--white-30: rgba(255, 255, 255, 0.3);
		--white-20: rgba(255, 255, 255, 0.2);
		--white-10: rgba(255, 255, 255, 0.1);
		--white-05: rgba(255, 255, 255, 0.05);
		--white-025: rgba(255, 255, 255, 0.025);
		--white-0125: rgba(255, 255, 255, 0.0125);

		--spacing-none: 0;
		--spacing-extra-small: 0.25rem;
		--spacing-small: 0.5rem;
		--spacing-medium: 1rem;
		--spacing-large: 2rem;
		--spacing-extra-large: 4rem;
		--spacing-extra-extra-large: 8rem;
		--spacing-extra-extra-extra-large: 16rem;
	}
`;

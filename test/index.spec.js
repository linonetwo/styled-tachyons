import { expect } from 'chai';
import ty, { getTachyons } from '../src/index';

describe('main export', () => {
  it('is not undefined', () => {
    expect(ty).not.to.be.undefined;
  });
});

describe('use tachyon-js properly', () => {
  it('w-100', () => expect(getTachyons`w_100`).to.be.deep.equal({ width: '100%' }));
  it('w-50', () => expect(getTachyons`w_50`).to.be.deep.equal({ width: '50%' }));
  it('b--black-50', () => expect(getTachyons`b__black_50`).to.be.deep.equal({ 'border-color': 'var(--black-50)' }));
  it('Grow', () =>
    expect(getTachyons`grow`).to.be.deep.equal({
      '-moz-osx-font-smoothing': 'grayscale',
      'backface-visibility': 'hidden',
      transform: 'translateZ(0)',
      transition: 'transform 0.25s ease-out',
    }));
});

describe('width', () => {
  it('w-100', () => expect(ty`w-100`()).to.be.deep.equal([{ width: '100%' }]));
  it('w-50', () => expect(ty`w-50`()).to.be.deep.equal([{ width: '50%' }]));
});

describe('border', () => {
  it('ba', () => expect(ty`ba`()).to.be.deep.equal([{ 'border-style': 'solid', 'border-width': '1px' }]));
  it('b--black-50', () => expect(ty`b--black-50`()).to.be.deep.equal([{ 'border-color': 'var(--black-50)' }]));
});

describe('multiple styles', () => {
  it('ba b--dotted', () =>
    expect(ty`ba b__dotted`()).to.be.deep.equal([
      { 'border-style': 'solid', 'border-width': '1px' },
      {
        'border-style': 'dotted',
      },
    ]));
});

const styledIf = (match, styles) => (props) => props[match] && styles;

describe('variable', () => {
  it('receives simple string', () =>
    expect(ty`${'ba'}`()).to.be.deep.equal([
      { 'border-style': 'solid', 'border-width': '1px' },
		]));

  it('receives styled-if and styled-is as variable', () =>
    expect(ty`${styledIf('border-black', `ba`)}`({ 'border-black': true })).to.be.deep.equal([
      { 'border-style': 'solid', 'border-width': '1px' },
    ]));

  it('receives styled-if and styled-is as variable, and return multiple styles', () =>
    expect(ty`${styledIf('border-black', `ba b__dotted`)}`({ 'border-black': true })).to.be.deep.equal([
      { 'border-style': 'solid', 'border-width': '1px' },
      { 'border-style': 'dotted' },
		]));

  it('receives styled-if and styled-is as variable, and return a list', () =>
    expect(ty`${styledIf('border-black', ['ba', 'b__dotted'])}`({ 'border-black': true })).to.be.deep.equal([
      { 'border-style': 'solid', 'border-width': '1px' },
      { 'border-style': 'dotted' },
    ]));

  it('receives function as variable', () =>
    expect(ty`${({ fine }) => fine && 'ph3_m'}`({ fine: true })).to.be.deep.equal([
      {
        '@media screen and (min-width: 30em) and (max-width: 60em)': {
          'padding-left': 'var(--spacing-medium)',
          'padding-right': 'var(--spacing-medium)',
        },
      },
    ]));
});

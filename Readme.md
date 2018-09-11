# styled-tachyons

Mix tachyons into styled-components. [Try it out in stackblitz.](https://stackblitz.com/edit/react-hfstqe?file=index.js)

## Usages

Put tachyons class names in `ty` template literal tag:

```js
import styled from 'styled-components';
import ty from 'styled-tachyons';

const Article = styled.article`
  ${ty`
    bg-black ph2 ph3_m
  `};
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
`;
```

You can use kebab-cased `bg-black` or snake_cased `ph3_m` or camelCase `bgBlue`.

### don't forget to inject the variables

```js
import { injectGlobal } from 'styled-components';
import { tachyonsVariables }  from 'styled-tachyons';

injectGlobal`
  ${tachyonsVariables};
`;
```

### with other styled-components libs

Put function that returns a tachyons class names:

```js
import styled from 'styled-components';
import is from 'styled-is';
import ty from 'styled-tachyons';

const Article = styled.article`
  ${ty`
    ${is('black')`
      bg-black
    `};
    ph2
    ${({ fine }) => fine && 'ph3_m'}
  `};
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
`;
```

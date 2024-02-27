### File structures:

Where we should put the flow types file.

```
phoenix-web
├──flow-typed //common and third-part Library Definition. e.g. loadsh,dayjs
├──src
	├──shared
	│	├──flow-typed // shared types definition
	│		├──shared.types.js //
	│		├──components
	│		│	├──index.js //require other types
	|		│	├──xxx.types.js // e.g. AirportInfo.types.js
	│		├── other
	│		│	├──index.js //require other types
	|		│	├──xxx.types.js //
	├──airBooking
	│	├──flow-typed // feature related types definition
	│	│	├──airBooking.type.js // e.g feature related request and resposne,
	│	│	├──componenets
	│	│	│	├──index.js // requere all the components types
	│	│	│	├──xx.types.js
	│	│	├── ...
```

**Note:** If the type you only use for current module, you can just put it in the current file.

### File name:

- Style 1: xxx.flow.js

- Style 2: xxx.js.flow

- Style 3: xxx.types.js

  **After discusstion**, we prefer the third one.

### Type names:

- Capitalize & CamelCase type names

```
// bad
type foo = string;
type myFoo = string;
type JSONApiEntity = {};

// good
type Foo = string;
type MyFoo = string;
type JsonApiEntity = {};
```

- **Functions:** Add a `Fn` / `Cb` suffix to mark types as functions / callbacks

```
// bad
getProductList: (Link) => Promise<any>,
onCheckInButtonClick: () => void

// good
getProductListFn: (Link) => Promise<any>,
onCheckInButtonClickCb: () => void
```

- The local type should has suffix 'Props', exported type should has suffix 'Type'

```

// bad
type Type = { //e.g. definition in our component
...
}

export type somePageExportedPageProps = {
...
}

// good
type Props = {
...
}

export type somePageExportedType = {
...
}

```

### Define the type clearly:

```
// bad
getProductListFn: Function
currencySuit: string

// good
getProductListFn: (Link) => Promise<FlightPricingPageResponse>
currencySuit: 'money' | 'points'
```

###

### Function definition:

- **Complex Arguments**: Try not to inline `Function` or `Object` definitions in

function headers (especially for export functions).

```
// bad
// Inline types makes it kinda hard to read, mkay?
function something(option: { a: string, b: string }, cb: (a: Object) => string): Promise<string> {
  // Function body
}

// good
// Explicit types makes it a little bit easier on the eyes
type Option = {
  a: string,
  b: string,
};

type CallbackFn = (a: Object) => string;

function something(option: Option, cb: CallbackFn): Promise<string> {
  // Function body
}
```

- **Complex Return Values**: Don't inline

```
// bad
function createObject(a: string, b: string): { a: string, b: Function } { /* ... */ }

// good
type SomeObj = { a: string, b: string };
function createObject(a: string, b: string): SomeObj { /* ... */ }

// also good
function something(): Promise<string> { /* ... */ }
```

### Import flow type

// Follow the flow.js official import style

_export_

```javascript
//src/airBooking/test.js
type SomeType = { a: string, b: string };
export default class Foo {}
```

_import_

```javascript
import React from 'react';
import Foo from 'src/airBooking/test';

import type { Node } from 'react';
import type { SomeType } from 'src/airBooking/test';
```

**_don't use this way because it may cause some warning in website console_**

```javascript
import React, { type Node } from 'react';
import Foo, { type SomeType } from 'src/airBooking/test';
```

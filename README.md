# bulk-angular-module
Extracts angular module names from a subdirectory structure passed by `bulk-require`.

## Example

```js
import * as bulk from 'bulk-require';
import { shouldThrowErrors, buildModule } from 'bulk-angular-module';

export const module = buildModule("your.module.name", bulk(__dirname, [ "*/*.js" ]));
```

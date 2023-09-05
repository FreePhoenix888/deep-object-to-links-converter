import { DeepClientInstance } from "@deep-foundation/deeplinks/imports/client.js";
import { Package } from "./package.js";
import { debug } from "./debug.js";
import { REQUIRED_PACKAGES_IN_MINILINKS } from "./required-packages-in-minilinks.js";
import { applyRequiredPackagesInMinilinks } from "./apply-required-packages-in-minilinks.js";
import { convert } from "./convert.js";
import { PACKAGE_NAME } from "./package-name.js";

/**
 * 
 * @example
 * #### Create a decorator from another decorator
```ts
const deep = new DeepClient({token: ''});
const anotherDeepDecorator = createAnotherDecorator(deep); // Note that this step is optional and showed only to demonstrate that you can create a decorator from another decorator and have a chain of decorators
const objectToLinksConverterDeepDecorator = createAdditionalFeatureDecorator(anotherDeepDecorator);
await objectToLinksConverterDeepDecorator.applyRequiredPackagesInMinilinks();
```
 */
export function createObjectToLinksConverterDecorator<
  TDeepClient extends DeepClientInstance,
>(deep: TDeepClient) {
  const log = debug(createObjectToLinksConverterDecorator.name);
  log({ deep });
  const _package = new Package({ deep });
  log({ _package });
  const result = Object.assign(
    {
      [PACKAGE_NAME]: _package,
      objectToLinksConverterPackage: _package,
      requiredPackagesInMinilinksToApply: [
        ...("requiredPackagesInMinilinksToApply" in deep
          ? (deep.requiredPackagesInMinilinksToApply as Array<string>)
          : []),
        ...REQUIRED_PACKAGES_IN_MINILINKS,
      ],
      applyRequiredPackagesInMinilinks: applyRequiredPackagesInMinilinks,
      convert: convert,
    } as ObjectToLinksConverterDecorator<TDeepClient>,
    deep,
  );
  log({ result });
  return result;
}

export type ObjectToLinksConverterDecorator<
  TDeepClient extends DeepClientInstance,
> = TDeepClient & {
  [PACKAGE_NAME]: Package;
  objectToLinksConverterPackage: Package;
  requiredPackagesInMinilinksToApply: Array<string>;
  applyRequiredPackagesInMinilinks: typeof applyRequiredPackagesInMinilinks;
  convert: typeof convert;
};

"use strict";

var angular = require("angular");

const flattenArray = (a, b) => a.concat(b);

var throwErrors = false;

export function shouldThrowErrors(should) {
    throwErrors = should;
}

export function buildFlatModule(moduleName, childDirs) {
    const childModuleNames = [];

    // for each file...
    Object.keys(childDir)
        .map(childFileName => (
            {
                childFileName,
                childFileContents: childDir[childFileName]
            }
        ))
        // and extract their module names, so we can depend on them.
        .forEach(childDirObject => {
            const { childFileContents, childFileName } = childDirObject;

            if (
                typeof childFileContents !== "object" ||
                typeof childFileContents.name !== "string"
            ) {
                const message = `Cannot find angular module name in ${ childFileName }`;
                if (shouldThrowErrors) {
                    throw new TypeError(message)
                } else {
                    console.warn(message);
                }
            } else {
                childModuleNames.push(childFileContents.name);
            }
        });

    return angular.module(moduleName, childModuleNames);
}

export function buildModule(moduleName, childDirs) {
    const childModuleNames = [];

    // for each subdirectory...
    Object.keys(childDirs)
        .map(childDirName => childDirs[childDirName])
        // pull out each file inside...
        .map(childDir =>
            Object.keys(childDir)
                .map(childFileName => (
                    {
                        childFileName,
                        childFileContents: childDir[childFileName]
                    }
                ))
        )
        .reduce(flattenArray, [])
        // and extract their module names, so we can depend on them.
        .forEach(childDirObject => {
            const { childFileContents, childFileName } = childDirObject;

            if (
                typeof childFileContents !== "object" ||
                typeof childFileContents.name !== "string"
            ) {
                const message = `Cannot find angular module name in ${ childFileName }`;
                if (shouldThrowErrors) {
                    throw new TypeError(message)
                } else {
                    console.warn(message);
                }
            } else {
                childModuleNames.push(childFileContents.name);
            }
        });

    return angular.module(moduleName, childModuleNames);
}

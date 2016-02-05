"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldThrowErrors = shouldThrowErrors;
exports.buildFlatModule = buildFlatModule;
exports.buildModule = buildModule;
var angular = require("angular");

var flattenArray = function flattenArray(a, b) {
    return a.concat(b);
};

var throwErrors = false;

function shouldThrowErrors(should) {
    throwErrors = should;
}

function buildFlatModule(moduleName, childDir) {
    var childModuleNames = [];

    // for each file...
    Object.keys(childDir).map(function (childFileName) {
        return {
            childFileName: childFileName,
            childFileContents: childDir[childFileName]
        };
    })
    // and extract their module names, so we can depend on them.
    .forEach(function (childDirObject) {
        var childFileContents = childDirObject.childFileContents;
        var childFileName = childDirObject.childFileName;

        if ((typeof childFileContents === "undefined" ? "undefined" : _typeof(childFileContents)) !== "object" || typeof childFileContents.name !== "string") {
            var message = "Cannot find angular module name in " + childFileName;
            if (shouldThrowErrors) {
                throw new TypeError(message);
            } else {
                console.warn(message);
            }
        } else {
            childModuleNames.push(childFileContents.name);
        }
    });

    return angular.module(moduleName, childModuleNames);
}

function buildModule(moduleName, childDirs) {
    var childModuleNames = [];

    // for each subdirectory...
    Object.keys(childDirs).map(function (childDirName) {
        return childDirs[childDirName];
    })
    // pull out each file inside...
    .map(function (childDir) {
        return Object.keys(childDir).map(function (childFileName) {
            return {
                childFileName: childFileName,
                childFileContents: childDir[childFileName]
            };
        });
    }).reduce(flattenArray, [])
    // and extract their module names, so we can depend on them.
    .forEach(function (childDirObject) {
        var childFileContents = childDirObject.childFileContents;
        var childFileName = childDirObject.childFileName;

        if ((typeof childFileContents === "undefined" ? "undefined" : _typeof(childFileContents)) !== "object" || typeof childFileContents.name !== "string") {
            var message = "Cannot find angular module name in " + childFileName;
            if (shouldThrowErrors) {
                throw new TypeError(message);
            } else {
                console.warn(message);
            }
        } else {
            childModuleNames.push(childFileContents.name);
        }
    });

    return angular.module(moduleName, childModuleNames);
}

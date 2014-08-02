cha-load
========
> Automatically load cha and register tasks.

## Install

```shell
$ npm install cha-load --save-dev
```

### Before

```js
// Manually require cha library.
var cha = require('cha');
// Manually require all tasks.
cha.in('glob',     require('task-glob'))
    .in('combine', require('task-combine'))
    .in('replace', require('task-replace'))
    .in('writer',  require('task-writer'))
    .in('uglifyjs',require('task-uglifyjs'))
    .in('copy',    require('task-copy'))
    .in('request', require('task-request'))
```

### After
```js
// Now only needs require cha-load
var cha = require('cha-load')();
```

## Usage

### Load all installed tasks

```js
require('cha-load')();
```

Equivalent to:

```js
require('cha-load')({pattern: 'task-*'});
```

### Load all tasks excluding one

You can exclude tasks using the negate `!` globbing pattern:

```js
require('cha-load')({pattern: ['task-*', '!task-coffee']});
```

### Set custom path to package.json

```js
require('cha-load')({config: '../package'});
```

### Only load from `devDependencies`

```js
require('cha-load')({scope: 'devDependencies'});
```

### Only load from `devDependencies` and `dependencies`

```js
require('cha-load')({scope: ['devDependencies', 'dependencies']});
```

## Options

### pattern

Type: `String`, `Array`
Default: `'task-*'` ([globbing pattern](https://github.com/isaacs/minimatch))

### config

Type: `String`, `Object`
Default: Path to nearest package.json

### scope

Type: `String`, `Array`
Default: `['dependencies', 'devDependencies', 'peerDependencies']`

### replace

Type: `String`
Default: `'task-'`

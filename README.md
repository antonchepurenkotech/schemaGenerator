schema
=================

xml json schema gen


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/schema.svg)](https://npmjs.org/package/schema)
[![Downloads/week](https://img.shields.io/npm/dw/schema.svg)](https://npmjs.org/package/schema)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g schema
$ schema COMMAND
running command...
$ schema (--version)
schema/0.0.0 linux-x64 node-v24.21.0
$ schema --help [COMMAND]
USAGE
  $ schema COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`schema hello PERSON`](#schema-hello-person)
* [`schema hello world`](#schema-hello-world)
* [`schema help [COMMAND]`](#schema-help-command)
* [`schema plugins`](#schema-plugins)
* [`schema plugins add PLUGIN`](#schema-plugins-add-plugin)
* [`schema plugins:inspect PLUGIN...`](#schema-pluginsinspect-plugin)
* [`schema plugins install PLUGIN`](#schema-plugins-install-plugin)
* [`schema plugins link PATH`](#schema-plugins-link-path)
* [`schema plugins remove [PLUGIN]`](#schema-plugins-remove-plugin)
* [`schema plugins reset`](#schema-plugins-reset)
* [`schema plugins uninstall [PLUGIN]`](#schema-plugins-uninstall-plugin)
* [`schema plugins unlink [PLUGIN]`](#schema-plugins-unlink-plugin)
* [`schema plugins update`](#schema-plugins-update)

## `schema hello PERSON`

Say hello

```
USAGE
  $ schema hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ schema hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/antonchepurenkotech/schema/blob/v0.0.0/src/commands/hello/index.ts)_

## `schema hello world`

Say hello world

```
USAGE
  $ schema hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ schema hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/antonchepurenkotech/schema/blob/v0.0.0/src/commands/hello/world.ts)_

## `schema help [COMMAND]`

Display help for schema.

```
USAGE
  $ schema help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for schema.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/6.3.0/src/commands/help.ts)_

## `schema plugins`

List installed plugins.

```
USAGE
  $ schema plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ schema plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/index.ts)_

## `schema plugins add PLUGIN`

Installs a plugin into schema.

```
USAGE
  $ schema plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into schema.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SCHEMA_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SCHEMA_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ schema plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ schema plugins add myplugin

  Install a plugin from a github url.

    $ schema plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ schema plugins add someuser/someplugin
```

## `schema plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ schema plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ schema plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/inspect.ts)_

## `schema plugins install PLUGIN`

Installs a plugin into schema.

```
USAGE
  $ schema plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into schema.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SCHEMA_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SCHEMA_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ schema plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ schema plugins install myplugin

  Install a plugin from a github url.

    $ schema plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ schema plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/install.ts)_

## `schema plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ schema plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ schema plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/link.ts)_

## `schema plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ schema plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ schema plugins unlink
  $ schema plugins remove

EXAMPLES
  $ schema plugins remove myplugin
```

## `schema plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ schema plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/reset.ts)_

## `schema plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ schema plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ schema plugins unlink
  $ schema plugins remove

EXAMPLES
  $ schema plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/uninstall.ts)_

## `schema plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ schema plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ schema plugins unlink
  $ schema plugins remove

EXAMPLES
  $ schema plugins unlink myplugin
```

## `schema plugins update`

Update installed plugins.

```
USAGE
  $ schema plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.5.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->

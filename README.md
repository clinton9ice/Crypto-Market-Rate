# Crypto Market Rate

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains the uncompiled assets  files.

### `components`

The components directory contains your Vue.js components. Components make up the different parts of the page and can be reused and imported into pages, layouts and even other components.


### `layouts`

Layouts are a great help when you want to change the look and feel, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

### `pages`

This directory contains the application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.


### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

### `store`

This directory contains Vuex store files. Creating a file in this directory automatically activates Vuex.

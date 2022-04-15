# http-game-apex

Linux *Apex Legends* tools powered by [http-driver](https://github.com/XRadius/http-driver). **These tools won't work without `http-driver`**.

# Quick Start

The easiest way to use `http-game-apex` is to navigate to your `http-driver` and load this connector:

```
https://xradius-apex.herokuapp.com/
```

This is the *precompiled production connector*, which [updates automatically](https://github.com/XRadius/http-game-apex/deployments/) for this repository.

# Installation

We'll setup a development environment to compile and run from source.

1. Install *Google Chrome*, *NodeJS* and *Visual Studio Code*:

* Follow the instructions at https://www.google.com/intl/en_us/chrome/
* Follow the instructions at http://nodejs.org/ (`node` >= 16, `npm` >= 7)
* Follow the instructions at https://code.visualstudio.com/

2. Clone this repository:

```
git clone https://github.com/XRadius/http-game-apex
```

3. Open the `http-game-apex` directory:

```
cd http-game-apex
```

4. Install dependencies:

```
npm install
```

5. Start debugging:

* Open the `http-game-apex` directory with *Visual Studio Code*.
* Press `F5`, wait for compilation, and eventually *Google Chrome* will launch.

6. Load as a *connector* in your `http-driver`:

* Use the *Google Chrome* window to navigate to your `http-driver`.
* Load *http://network-ip:3000/* as the *connector*. Replace `network-ip` for your *network IP*.

Finally, you can use `npm run webpack:build` to build your own *precompiled production version*.

# Contributions

So, you want to contribute? Please do!

* [Bugfixes]: Pull requests are always welcome.
* [New Offsets]: Pull requests are always welcome.
* [New Features]: Discuss before a pull request.
* [New Tools]: Discuss before a pull request.

Anything else should be discussed first.

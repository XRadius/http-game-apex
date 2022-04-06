# http-game-apex

Linux *Apex Legends* tools powered by [http-driver](https://github.com/XRadius/http-driver). **These tools won't work without `http-driver`**.

# Installation

Tools run in *Chrome for Android* or *Safari for iOS*. Other browsers may not work as intended.

## Production

The easiest way to get going with `http-game-apex` is to open the *precompiled production version*:

* [Click here for the live version](http://xradius-apex.herokuapp.com/)

Make sure you are on the HTTP version, **NOT** the HTTPS version. [It won't work on HTTPS](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)!

## Developers

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

* Open the repository with *Visual Studio Code*.
* Press `F5`, wait for compilation, and eventually *Google Chrome* will launch.
* Change any piece of code and the application will automatically refresh.

Finally, you can use `npm run webpack:build` to build your own *precompiled production version*.

# Usage

After selecting the tool of your choice, you need to enter some information:

* Server=http://YOUR_MACHINE_IP:8080
  * Replace `YOUR_MACHINE_IP` with your computer local IP address.
  * See [this FAQ for more information](https://letmegooglethat.com/?q=how+do+I+get+my+computer+local+ip+address]) on local IP addresses.
* Username=???
  * Use the value you set during installation of `http-driver`.
* Password=???
  * Use the value you set during installation of `http-driver`.

# Contributions

So, you want to contribute? Please do!

* [Bugfixes]: Pull requests are always welcome.
* [New Offsets]: Pull requests are always welcome.
* [New Features]: Discuss before a pull request.
* [New Tools]: Discuss before a pull request.

Anything else should be discussed first.

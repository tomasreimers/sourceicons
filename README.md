# SourceIcons

## About

SourceIcons provide information about Github repos on remote pages.

## Installation

Include the following CSS and JS in your page:

    <link rel='stylesheet' type='text/css' href='sourceicons.css' />
    <script type="text/javascript" src='sourceicons.js'></script>

Additionally, SourceIcons requires jQuery. To use the Google hosted jQuery, add:

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

## Usage

    <a href="tomasreimers/sourceicons" class="sourceicon">My repository.</a>

Note that the `href` should be the repository, and the link should have the class `sourceicons`.

When clicked it will display a modal with information about the repository.

![Modal](https://raw.github.com/tomasreimers/sourceicons/master/example.png)

## Fallback

If the Github API is down, sourceicons will simply modify the URL to point to the correct repo and not display a modal when clicked on.

## Ribbons

![Ribbon](https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png)

sourceicons can also automatically create a Github ribbon for you.

    <a href="tomasreimers/sourceicons" class="sourceicon_ribbon"></a>

This will create a 'Fork me on Github' ribbon on your page, that behaves the same way as any other sourceicon link (clicking on it will reveal the modal).

The ribbon can accept 2 config attributes:

`data-sourceicon-side`: which side of the page to display the ribbon on.

 - `left`
 - `right` (default)

`data-sourceicon-color`: what color to use for the sourceicon.

 - `red`
 - `green`
 - `black` (default) 
 - `orange`
 - `gray` 
 - `white`

## Support (Tested on)

 - Firefox 17+
 - Chrome 23+
 - Opera 11+ 
 - IE 9+
 - Safari 5+

## Thanks

 - [This blog post](https://github.com/blog/273-github-ribbons) for providing the `Fork me on Github` ribbons
 - [This shot on Dribbble](http://dribbble.com/shots/817569-12-steps) for providing inspiration
 - [MJIJACKSON](http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript) for providing a basis to convert hsl to hex color values

## Copyright and License

(C) Tomas Reimers, 2012

Licensed under an MIT license (see license.txt).
$('document').ready(function (){
    var hsl2hex = function (h, s, l){
        // adopted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        r *= 255;
        g *= 255;
        b *= 255;
        var hexchar = "0123456789ABCDEF";
        var rhex = hexchar[Math.floor(r/16)] + hexchar[Math.floor(r)%16];
        var ghex = hexchar[Math.floor(g/16)] + hexchar[Math.floor(g)%16];
        var bhex = hexchar[Math.floor(b/16)] + hexchar[Math.floor(b)%16];
        return '#' + rhex + ghex + bhex;
    };
    var ribbons = {
        'left': { 
            'red': 'https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png',
            'green': 'https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png',
            'black': 'https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png',
            'orange': 'https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png',
            'gray': 'https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png',
            'white': 'https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png',
        },
        'right': {
            'red': 'https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png',
            'green': 'https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png',
            'black': 'https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png',
            'orange': 'https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png',
            'gray': 'https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png',
            'white': 'https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png'
        }
    };
    $('a.sourceicon, a.sourceicon_ribbon').each(function (index, element){
        if ($(this).hasClass('sourceicon_ribbon')){
            // get ribbon parameters
            var ribbon_direction = $(element).attr('data-sourceicon-side');
            if (typeof(ribbons[ribbon_direction]) === 'undefined'){
                ribbon_direction = 'right';
            }

            var ribbon_color = $(element).attr('data-sourceicon-color');
            if (typeof(ribbons[ribbon_direction][ribbon_color]) === 'undefined'){
                ribbon_color = 'black';
            }

            var ribbon_url = ribbons[ribbon_direction][ribbon_color];

            // define style
            $(element)
                .css('position', 'absolute')
                .css('top', '0')
                .css(ribbon_direction, '0');
            $(element).html('<img alt="Fork me on Github" src="' + ribbon_url + '" />');
        }

        // change the URL
        var repo = $(element).attr('href');
        $(element).attr('href', 'http://github.com/' + repo);

        // get the github data
        $.ajax({
            url: 'https://api.github.com/repos/' + repo,
            dataType: 'jsonp',
            success: function (data_wrapper){

                if ($('.sourceicon_curtain').length == 0){
                    $('body').append('<div class="sourceicon_curtain"></div>');
                    $('.sourceicon_curtain').on('click', function (){
                        $('.sourceicon_curtain').fadeOut(200);
                        $('.sourceicon_holder').slideUp(200);
                    });
                }

                var data = data_wrapper.data;
                data.hue = data.id % 360;

                var gradient = '\
                    background-image: linear-gradient(right bottom, hsl(' + data.hue + ', 80%, 40%) 0%, hsl(' + data.hue + ', 80%, 24%) 100%);\
                    background-image: -o-linear-gradient(right bottom, hsl(' + data.hue + ', 80%, 40%) 0%, hsl(' + data.hue + ', 80%, 24%) 100%);\
                    background-image: -moz-linear-gradient(right bottom, hsl(' + data.hue + ', 80%, 40%) 0%, hsl(' + data.hue + ', 80%, 24%) 100%);\
                    background-image: -webkit-linear-gradient(right bottom, hsl(' + data.hue + ', 80%, 40%) 0%, hsl(' + data.hue + ', 80%, 24%) 100%);\
                    background-image: -ms-linear-gradient(right bottom, hsl(' + data.hue + ', 80%, 40%) 0%, hsl(' + data.hue + ', 80%, 24%) 100%);\
                    background-image: -webkit-gradient(\
                        linear,\
                        right bottom,\
                        left top,\
                        color-stop(0, hsl(' + data.hue + ', 80%, 40%)),\
                        color-stop(1, hsl(' + data.hue + ', 80%, 24%))\
                    );\
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + hsl2hex(data.hue/360, 0.8, 0.24) + '\', endColorstr=\'' + hsl2hex(data.hue/360, 0.8, 0.4) + '\',GradientType=1 );';

                var created_date_obj = new Date(Date.parse(data.created_at));
                var created_date_string = (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])[created_date_obj.getMonth()] + ' ' + created_date_obj.getFullYear();

                var updated_date_obj = new Date(Date.parse(data.updated_at));
                var updated_date_string = (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])[updated_date_obj.getMonth()] + ' ' + updated_date_obj.getFullYear();

                $('body').append('<div class="sourceicon_holder" style="display:none" data-sourceicon-repo="' + repo + '">\
                        <div class="sourceicon_gradient" style="' + gradient + '">\
                            <div class="sourceicon_title">' + data.name + '</div>\
                            <div class="sourceicon_link">\
                                <a href="' + data.html_url + '">' + data.full_name + '</a>\
                            </div>\
                            <div class="sourceicon_additional_info">' + data.watchers_count + ' Watchers, ' + data.forks + ' Forks</div>\
                        </div>\
                        <div class="sourceicon_buttons">\
                            <div class="sourceicon_date">' + created_date_string + ' - ' + updated_date_string + '</div>\
                            <div class="sourceicon_divider"></div>\
                            <div class="sourceicon_collaborators"><a href="https://github.com/' + data.owner.login + '">' + data.owner.login + '</a></div>\
                        </div>\
                        <div class="sourceicon_description">\
                            <div class="sourceicon_short">' + data.description + '</div>\
                            <div class="sourceicon_readmore"><a href="' + data.html_url + '#readme">Read More<a></div>\
                        </div>\
                        <!-- Propic -->\
                        <div class="sourceicon_sidebox">\
                            <div class="sourceicon_gloss">\
                                <img class="sourceicon_propic" src="' + data.owner.avatar_url + '" />\
                            </div>\
                        </div>\
                    </div>');

                $(element).on('click', function (ev){
                    ev.preventDefault();
                    $('[data-sourceicon-repo="' + repo + '"]').slideDown(200);
                    $('.sourceicon_curtain').fadeIn(200);
                });
            }
        });
    });
});
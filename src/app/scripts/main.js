(function ($, Odometer) {
    'use strict';

    window.odometerOptions = {
        auto: false,
        format: 'd'
    };

    var i,
        value,
        od,
        elements = document.querySelectorAll('.odometer'),
        buildOdometers = function (items) {
            var odArray = [];
            for (i = 0; i < items.length; i += 1) {
                odArray.push(new Odometer({
                    el: items[i],
                    value: 0,
                    format: 'd'
                }));
            }
            return odArray;
        },
        updateItem = function (val, odItem) {
            $(odItem.el).css('opacity', 1);
            odItem.update(val);
        },
        updateValues = function (items, setToZero) {
            for (i = 0; i < elements.length; i += 1) {
                value = setToZero !== true ? $(elements[i]).data('value') : 0;
                od = items[i];

                if (setToZero) {
                    $(elements[i]).css('opacity', 0);
                    updateItem(value, od);
                } else {
                    setTimeout(
                        updateItem(value, od),
                        i * 10000
                    );
                }
            }
        };

    $(document).ready(function () {
        $('#fullpage').fullpage({
            anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5', 'page-6', 'page-7', 'page-8'],
            onLeave: function (index, nextIndex, direction) {
                if (index === 7) {
                    updateValues(buildOdometers(elements), true);
                }
            },
            afterLoad: function (anchorLink, index) {
                if (index === 7) {
                    updateValues(buildOdometers(elements), false);
                }
            }
        });
    });
})(jQuery, Odometer);

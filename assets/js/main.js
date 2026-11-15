// Slider on the home page and Citation.js references. No dependencies.
(function () {
  'use strict';

  // --- Slider ---------------------------------------------------------------
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = slider.querySelectorAll('.slide');
    var dots = slider.querySelectorAll('.dot');
    var current = 0;
    var timer = null;

    var show = function (index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active-dot');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active-dot');
    };
    var play = function () {
      timer = setInterval(function () { show(current + 1); }, 4500);
    };
    var pause = function () { clearInterval(timer); };

    slider.querySelector('.slide-next').addEventListener('click', function () { show(current + 1); });
    slider.querySelector('.slide-prev').addEventListener('click', function () { show(current - 1); });
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () { show(index); });
    });
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', play);
    play();
  }

  // --- References -----------------------------------------------------------
  // <ul class="cite" data-wikidata="Q1 Q2"> is filled with Vancouver-style
  // references, each followed by its DOI and an Altmetric badge. If anything
  // fails, the plain Wikidata links written by Hugo stay in place.
  var lists = document.querySelectorAll('ul.cite[data-wikidata]');
  if (lists.length && typeof require === 'function') {
    var Cite = require('citation-js');
    lists.forEach(function (list) {
      Cite.async(list.getAttribute('data-wikidata').split(' ')).then(function (cite) {
        var items = cite.data.map(function (entry) {
          var li = document.createElement('li');
          li.innerHTML = new Cite(entry).format('bibliography', {
            format: 'html', template: 'vancouver', lang: 'en-US'
          });
          if (entry.DOI) {
            var target = li.querySelector('.csl-right-inline') || li.querySelector('.csl-entry') || li;
            var link = document.createElement('a');
            link.href = 'https://doi.org/' + entry.DOI;
            link.textContent = entry.DOI;
            var badge = document.createElement('span');
            badge.className = 'altmetric-embed';
            badge.setAttribute('data-doi', entry.DOI);
            target.append(' doi:', link, ' ', badge);
          }
          return li;
        });
        if (items.length) {
          list.replaceChildren.apply(list, items);
          if (typeof window._altmetric_embed_init === 'function') {
            window._altmetric_embed_init();
          }
        }
      }).catch(function (error) {
        console.warn('Could not format references', error);
      });
    });
  }
})();

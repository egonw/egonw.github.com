Egon Willighagen's Homepage
---------------------------

My homepage is HTML5 + RDFa, generated with [Hugo](https://gohugo.io/). At the
bottom of each page there are icons, each of which has a link. The HTML5 and CSS
icons lead to validation reports. The last icon extracts the RDF statements that
are embedded in the page.

The slider was originally created by Lars Willighagen (see the commits).

Editing
-------

* `content/` has the text of the pages, in Markdown
* `data/team.yaml` has the (past) group members and students
* `data/contact.yaml` has the addresses and accounts shown at the bottom of every page
* `data/slides.yaml` has the slides on the home page
* `hugo.toml` has the header text and the navigation menu
* `layouts/`, `assets/css/main.css` and `assets/js/main.js` define the look of the site

Shortcodes that can be used in the Markdown: `interest` and `project` (text
that is also a FOAF statement), `team`, `cite` (references by Wikidata
identifier) and `fold`. Each is
documented at the top of its file in `layouts/shortcodes/`.

Building
--------

    hugo server    # preview at http://localhost:1313/
    hugo           # write the site to public/

Pushing to `master` builds and deploys the site with GitHub Actions
(`.github/workflows/hugo.yml`).

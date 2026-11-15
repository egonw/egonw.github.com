---
title: Wikidata Profile
url: /wikidata.html
wide: true
---

Scholarly profile page constructed from queries to Wikidata Query Service.
Read more on [Twitter](https://twitter.com/search?q=wikicite).
This page is based on the work by
[Finn Årup Nielsen](https://finnaarupnielsen.wordpress.com/2016/09/30/the-wikidata-scholarly-profile-page/).
The [source of this file](https://github.com/egonw/egonw.github.com/blob/master/content/wikidata.md) is on GitHub,
based on that work by Finn. Also check out
[this tools.mflabs.org page](http://tools.wmflabs.org/scholia/author/Q21562060)
where you can simply add your Wikidata page in the URL.

### Education

{{< wdqs title="Education" >}}
#defaultView:Timeline
SELECT ?education ?education_label ?education_beginning ?education_ending ?education_degree_label WHERE {
  ?scholar p:P69 ?education_statement .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?education_statement ps:P69 ?education .
  ?education rdfs:label ?education_label . filter (lang(?education_label) = 'en')
  optional { ?education_statement pq:P580 ?education_beginning . }
  optional { ?education_statement pq:P582 ?education_ending . }
  optional { ?education_statement pq:P512 ?education_degree .
            ?education_degree rdfs:label ?education_degree_label . filter (lang(?education_degree_label) = 'en')
           }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
{{< /wdqs >}}

### Employment

{{< wdqs title="Employment" >}}
#defaultView:Timeline
SELECT ?work ?work_label ?work_beginning ?work_ending ?work_degree_label WHERE {
  ?scholar p:P108 | p:P1416 ?work_statement .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work_statement ps:P108 | ps:P1416 ?work .
  ?work rdfs:label ?work_label . filter (lang(?work_label) = 'en')
  optional { ?work_statement pq:P580 ?work_beginning . }
  optional { ?work_statement pq:P582 ?work_ending . }
  optional { ?work_statement pq:P512 ?work_degree .
            ?work_degree rdfs:label ?work_degree_label . filter (lang(?work_degree_label) = 'en')
           }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
{{< /wdqs >}}

### List of publications

{{< wdqs title="List of publications" >}}
#defaultView:Table
SELECT ?work ?workLabel (min(?dates) as ?date) (sample(?pages_) as ?pages) (sample(?venue_labels) as ?venue) (group_concat(?author_label; separator=", ") as ?authors) WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work wdt:P50 ?author .
  ?author rdfs:label ?author_label . filter (lang(?author_label) = 'en')

  optional { ?work wdt:P577 ?dates }
  optional { ?work wdt:P1104 ?pages_ }
  optional { ?work wdt:P1433 ?venues . ?venues rdfs:label ?venue_labels . filter (lang(?venue_labels) = 'en') }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} group by ?work ?workLabel
order by desc(?date)
{{< /wdqs >}}

### Venue statistics

{{< wdqs title="Venue statistics (table)" half="true" >}}
#defaultView:Table
SELECT ?venue ?venueLabel (count(?work) as ?count) WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work wdt:P1433 ?venue .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} group by ?venue ?venueLabel
order by desc(?count)
{{< /wdqs >}}
{{< wdqs title="Venue statistics (bubble chart)" half="true" >}}
#defaultView:BubbleChart
SELECT ?venue ?venueLabel (count(?work) as ?count) WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work wdt:P1433 ?venue .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} group by ?venue ?venueLabel
order by desc(?count)
{{< /wdqs >}}

### Co-author graph

(this is unfortunately somewhat wobbly. Help, Jonas Kress!)

{{< wdqs title="Co-author graph" >}}
#defaultView:Graph
SELECT ?author1 ?author1Label ?rgb ?author2 ?author2Label WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work wdt:P50 ?author1 .
  ?work wdt:P50 ?author2 .
  ?work wdt:P31 wd:Q13442814 .
  filter (?author1 != ?author2)
  filter (wd:Q20980928 != ?author1)
  filter (wd:Q20980928 != ?author2)
  ?author1 wdt:P21 ?gender1 .
  bind( if(?gender1 = wd:Q6581097, "3333AA", "AA3333") as ?rgb)
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }
}
{{< /wdqs >}}

### Themes

{{< wdqs title="Themes" half="true" >}}
#defaultView:ImageGrid
#defaultView:ImageGrid
select ?theme ?themeLabel ?image (count(?work) as ?count)   WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?work wdt:P921 ?theme .
  optional { ?theme wdt:P18 ?image . }
  service wikibase:label { bd:serviceParam wikibase:language "en" . }
}
group by ?theme ?themeLabel ?image
order by desc(?count)
{{< /wdqs >}}
{{< wdqs title="Images" half="true" >}}
#defaultView:ImageGrid
SELECT distinct ?image WHERE {
  { ?scholar wdt:P18 ?image ;
             wdt:P496 "0000-0001-7542-0286" .}
  UNION {
    ?scholar ?property ?item ;
             wdt:P496 "0000-0001-7542-0286" .
    ?item wdt:P18 ?image
    filter (?item != wd:Q5)
  }
}
{{< /wdqs >}}

### Locations

{{< wdqs title="Locations" >}}
#defaultView:Map
SELECT distinct ?image ?item ?item_label ?geo (?property as ?layer) WHERE {
  ?scholar ?property ?item .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?item wdt:P625 ?geo .
  ?item rdfs:label ?item_label . filter (lang(?item_label) = 'en')
  optional { ?item wdt:P18 ?image . }
}
{{< /wdqs >}}

### Citation statistics

#### Most cited work

{{< wdqs title="Most cited work" >}}
#defaultView:Table
SELECT ?work ?work_label (count(?citing_work) as ?count) WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?citing_work wdt:P2860 ?work .
  ?work rdfs:label ?work_label . filter (lang(?work_label) = 'en')
} group by ?work ?work_label
order by desc(?count)
limit 20
{{< /wdqs >}}

#### Citing authors

(excluding citations from my own papers)

{{< wdqs title="Citing authors" >}}
#defaultView:Table
SELECT ?citing_author ?citing_author_label (count(?citing_work) as ?count) WHERE {
  ?work wdt:P50 ?scholar .
  ?scholar wdt:P496 "0000-0001-7542-0286" .
  ?citing_work wdt:P2860 ?work .
  minus { ?citing_work wdt:P50 ?scholar }
  ?citing_work wdt:P50 ?citing_author .
  ?citing_author rdfs:label ?citing_author_label . filter (lang(?citing_author_label) = 'en')
} group by ?citing_author ?citing_author_label
order by desc(?count)
limit 20
{{< /wdqs >}}

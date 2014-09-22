data-map: easily create geojson-driven maps in HTML pages by using
data-* attributes, no coding required. data-map only supports using
point features as placemarks, but can show customized popups. Pull
requests for additional functionality welcome.

### Documentation

You create a map simply by adding a div to your page with class
`data-map', and setting the following attributes.

- `data-geojson`: the URL of a [GeoJSON](http://geojson.org/) file
  which contains your GeoJSON data (only points are supported for now)
- `data-popup`: the popup text for the placemarks. You can reference
  the fields in the GeoJSON using sprintf-style format strings, e.g.
  `%(name)s` would insert the field `name`
- `data-lat`, `data-lon` and `data-zoom`: the initial latitude,
  longitude and [zoom level](/2011/10/29/google-maps-tile-scales/) for
  the map.
- `data-basemap`: (optional, advanced) the URL of custom tiles to use;
  defaults to MapQuest OSM.
- `data-attribution`: (optional) any attribution you would like to
  display. If `data-basemap` is set, this will be used as the
  attribution; otherwise, the attribution for MapQuest tiles will be
  appended.
  
Additionally, you will need to set the map to be a particular size,
for instance by specifying `style="width: 600px; height: 600px"`. Bear
in mind also that if you specify any HTML in the popup or the
attribution, double quotes will need to be written as `&amp;quot;`.

To use data-map, just include its JavaScript file in your page. You'll
need to have already loaded jQuery. On
[my blog](http://www.indicatrix.org), I load the script on every page;
it shouldn't hurt anything else.

Here is a working example, which you can [see in action](http://projects.indicatrix.org/data-map/).

`<div class="data-map" style="width: 700px; height: 400px" data-lat="38" data-lon="-97" data-zoom="4" data-geojson="demo.geojson" data-popup="<h2>%(name)s</h2>%(desc)s"></div>`

Portions from [sprintf.js](https://github.com/alexei/sprintf.js) by
Alexandru Marasteanu.


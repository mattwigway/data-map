// data-map.js: github.com/mattwigway/data-map

$(document).ready(function () {
  // find all of the maps on the page
  var m = $('.data-map');
    
  if (m.length > 0) {

    /*! sprintf-js | Alexandru Marasteanu <hello@alexei.ro> (http://alexei.ro/) | BSD-3-Clause */
    !function(a){function b(){var a=arguments[0],c=b.cache;return c[a]&&c.hasOwnProperty(a)||(c[a]=b.parse(a)),b.format.call(null,c[a],arguments)}function c(a){return Object.prototype.toString.call(a).slice(8,-1).toLowerCase()}function d(a,b){return Array(b+1).join(a)}var e={not_string:/[^s]/,number:/[dief]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fiosuxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/};b.format=function(a,f){var g,h,i,j,k,l,m,n=1,o=a.length,p="",q=[],r=!0,s="";for(h=0;o>h;h++)if(p=c(a[h]),"string"===p)q[q.length]=a[h];else if("array"===p){if(j=a[h],j[2])for(g=f[n],i=0;i<j[2].length;i++){if(!g.hasOwnProperty(j[2][i]))throw new Error(b("[sprintf] property '%s' does not exist",j[2][i]));g=g[j[2][i]]}else g=j[1]?f[j[1]]:f[n++];if("function"==c(g)&&(g=g()),e.not_string.test(j[8])&&"number"!=c(g)&&isNaN(g))throw new TypeError(b("[sprintf] expecting number but found %s",c(g)));switch(e.number.test(j[8])&&(r=g>=0),j[8]){case"b":g=g.toString(2);break;case"c":g=String.fromCharCode(g);break;case"d":case"i":g=parseInt(g,10);break;case"e":g=j[7]?g.toExponential(j[7]):g.toExponential();break;case"f":g=j[7]?parseFloat(g).toFixed(j[7]):parseFloat(g);break;case"o":g=g.toString(8);break;case"s":g=(g=String(g))&&j[7]?g.substring(0,j[7]):g;break;case"u":g>>>=0;break;case"x":g=g.toString(16);break;case"X":g=g.toString(16).toUpperCase()}!r||e.number.test(j[8])&&j[3]?(s=r?"+":"-",g=g.toString().replace(e.sign,"")):s="",l=j[4]?"0"===j[4]?"0":j[4].charAt(1):" ",m=j[6]-(s+g).length,k=j[6]?d(l,m):"",q[q.length]=j[5]?s+g+k:"0"===l?s+k+g:k+s+g}return q.join("")},b.cache={},b.parse=function(a){for(var b=a,c=[],d=[],f=0;b;){if(null!==(c=e.text.exec(b)))d[d.length]=c[0];else if(null!==(c=e.modulo.exec(b)))d[d.length]="%";else{if(null===(c=e.placeholder.exec(b)))throw new SyntaxError("[sprintf] unexpected placeholder");if(c[2]){f|=1;var g=[],h=c[2],i=[];if(null===(i=e.key.exec(h)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(g[g.length]=i[1];""!==(h=h.substring(i[0].length));)if(null!==(i=e.key_access.exec(h)))g[g.length]=i[1];else{if(null===(i=e.index_access.exec(h)))throw new SyntaxError("[sprintf] failed to parse named argument key");g[g.length]=i[1]}c[2]=g}else f|=2;if(3===f)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");d[d.length]=c}b=b.substring(c[0].length)}return d};var f=function(a,c,d){return d=(c||[]).slice(0),d.splice(0,0,a),b.apply(null,d)};"undefined"!=typeof exports?(exports.sprintf=b,exports.vsprintf=f):(a.sprintf=b,a.vsprintf=f,"function"==typeof define&&define.amd&&define(function(){return{sprintf:b,vsprintf:f}}))}("undefined"==typeof window?this:window);

    // end sprintf.js, begin original code


    // maps found on page, load Leaflet
    var l = $('<link rel="stylesheet" />');
    $('head').append(l);
    l.attr('href', 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css');
    $.getScript('http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js',
      function () {
	m.each(function () {
	  var $t = $(this);
	  var map = L.map(this);
	  map.setView([$t.attr('data-lat'), $t.attr('data-lon')], $t.attr('data-zoom'));
          
          // add tiles
          // Default: MapQuest OSM
          if (typeof $t.attr('data-basemap') == 'undefined') {
            
            var attr = 'Basemap data &copy; OpenStreetMap contributors, <p>Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png"></p>'
            
            L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
              attribution: typeof $t.attr('data-attribution') == 'undefined' ? attr : $t.attr('data-attribution') + ' ' + attr
            }).addTo(map);
          }
          else {
            L.tileLayer($t.attr('data-basemap'), {
              attribution: $t.attr('data-attribution')
            }).addTo(map);
          }
          
	  $.ajax({
	    url: $t.attr('data-geojson'),
	    dataType: 'json',
	      success: function (data) {
		L.geoJson(data, {
		  onEachFeature: function (f, l) {
		    l.bindPopup(sprintf($t.attr('data-popup'), f.properties))
		  }
		}).addTo(map);
	      }});
	});
      });
  }
});
			

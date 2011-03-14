var tl;
function onLoad() {
  var eventSource = new Timeline.DefaultEventSource();
  var bandInfos = [
    Timeline.createBandInfo({
      eventSource:    eventSource,
      date:           "Jan 01 2011 00:00:00 GMT",
      width:          "70%",
      intervalUnit:   Timeline.DateTime.MONTH,
      intervalPixels: 100
    }),
    Timeline.createBandInfo({
      overview:       true,
      eventSource:    eventSource,
      date:           "Jan 01 2011 00:00:00 GMT",
      width:          "30%",
      intervalUnit:   Timeline.DateTime.YEAR,
      intervalPixels: 200
    })
  ];
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;

  tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
  Timeline.loadXML("timeline-cv.xml", function(xml, url) { eventSource.loadXML(xml, url); });
}

var resizeTimerID = null;
function onResize() {
  if (resizeTimerID == null) {
    resizeTimerID = window.setTimeout(function() {
      resizeTimerID = null;
      tl.layout();
    }, 500);
  }
}


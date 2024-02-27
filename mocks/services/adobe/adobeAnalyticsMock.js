module.exports = {
  path: '/adobeAnalyticsMock.js',
  cache: false,
  method: 'GET',
  render: (req, res) => {
    res.append('Content-Type', 'application/javascript');
    res.send(`
   window._satellite = {
      track: function(satelliteTrack) {
        console.log("satelliteTrack: ", satelliteTrack);
      }
    };
    window.analytics_events_counter = 0;
    window._trackAnalytics = {
      event: function() {
        window.analytics_events_counter++;
      }
    };`);
  }
};

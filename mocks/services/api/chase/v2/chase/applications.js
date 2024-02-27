module.exports = {
  path: '/api/chase/v2/chase/applications',
  method: 'POST',
  cache: false,
  render: (req, res) =>
    res.json({
      originationApplicationIdentifier: '0d04a7e2-b14d-4979-bc08-91097c3fc01a',
      links: [
        {
          rel: 'DAOCARD-URL',
          href: req.body.returnToURL
        }
      ]
    })
};

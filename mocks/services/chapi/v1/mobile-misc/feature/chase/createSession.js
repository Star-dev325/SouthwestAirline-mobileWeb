module.exports = {
  path: '/chapi/v1/mobile-misc/feature/chase/sessions',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json({ chaseSessionId: 'CHASE_SESSION' })
};

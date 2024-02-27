function createReviewers() {
  const allDevelopers = [
    { id: 'e105247', name: 'Brian Butler' },
    { id: 'e90698', name: 'Lee Ann Mendel' },
    { id: 'x248320', name: 'Jimmy Truesdell' },
    { id: 'e143107', name: 'John Dahl' },
    { id: 'e131679', name: 'Allen Parslow' },
    { id: 'x254144', name: 'Chase Thompson' },
    { id: 'x261824', name: 'Amanda Bsaibes' },
    { id: 'x258176', name: 'Abdul Ahmed' }
  ];

  return allDevelopers.map((developer) => {
    return {
      user: {
        name: developer.id
      }
    };
  });
}

module.exports = createReviewers;

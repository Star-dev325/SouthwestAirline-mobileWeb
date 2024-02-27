module.exports = {
  path: '/api/v1/accounts/security-questions',
  method: 'GET',
  cache: false,
  template: {
    securityQuestions: [
      'What is the name of your favorite singer/band?',
      "What is your mother's maiden name?",
      'What was your high school mascot?',
      'What is the name of your favorite sports team?',
      'What is the middle name of your youngest child?',
      'What was the color of your first car?',
      'What is your favorite ice cream flavor?',
      'What is the name of your first pet?',
      'What is the name of the city in which you were born?',
      'What is the name of your favorite movie?'
    ]
  }
};

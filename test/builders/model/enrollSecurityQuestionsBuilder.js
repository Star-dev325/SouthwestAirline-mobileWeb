// @flow

export default class enrollSecurityQuestionsBuilder {
  securityQuestions = [
    'What is the name of your favorite sports team?',
    'What is the middle name of your youngest child?',
    'What is you favorite very super extremely long longer longest crazy question?',
    'What was the color of your first car?'
  ];

  build(): Array<string> {
    return this.securityQuestions;
  }
}

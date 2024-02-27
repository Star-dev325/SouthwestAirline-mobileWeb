function FooterWithLinksBuilder() {
  this.footerWithLinks = '<a href="mock-url" target="_blank">Mock Link</a>';

  this.withMultipleLinks = function () {
    this.footerWithLinks =
      '<a href="mock-url" target="_blank">Mock Link One</a><br/><a href="mock-url" target="_blank">Mock Link Two</a><br /><a href="mock-url" target="_blank">Mock Link Three</a><p>Some mock text here with some information.</p>';

    return this;
  };

  this.build = function () {
    return {
      footerWithLinks: this.footerWithLinks
    };
  };
}

module.exports = FooterWithLinksBuilder;

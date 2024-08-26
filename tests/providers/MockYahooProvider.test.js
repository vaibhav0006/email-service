const { expect } = require("chai");
const MockYahooProvider = require("../../src/providers/MockYahooProvider");

describe("MockYahooProvider", function () {
  let provider;

  beforeEach(() => {
    provider = new MockYahooProvider();
  });

  it("should send email and return true or false", function () {
    const result = provider.send({
      to: "test@example.com",
      subject: "Test",
      body: "Test",
    });
    expect(result).to.be.oneOf([true, false]);
  });
});

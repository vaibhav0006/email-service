const { expect } = require("chai");
const MockGmailProvider = require("../../src/providers/MockGmailProvider");

describe("MockGmailProvider", function () {
  let provider;

  beforeEach(() => {
    provider = new MockGmailProvider();
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

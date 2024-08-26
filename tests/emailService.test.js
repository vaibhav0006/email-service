const { expect } = require("chai");
const EmailService = require("../src/services/EmailService");

describe("EmailService", function () {
  let emailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  it("should send email successfully via provider 1 or 2", async function () {
    const email = {
      to: "test@example.com",
      subject: "Test",
      body: "This is a test",
    };
    const result = await emailService.sendEmail(email);
    expect(result).to.satisfy((res) => res.includes("sent successfully"));
  });

  it("should respect rate limiting", async function () {
    const email = {
      to: "test@example.com",
      subject: "Rate Limit Test",
      body: "This is a rate limit test",
    };
    await emailService.sendEmail(email);
    const result = await emailService.sendEmail(email);
    expect(result).to.equal("Rate limit exceeded");
  });

  it("should track status of sent emails", async function () {
    const email = {
      to: "test@example.com",
      subject: "Status Test",
      body: "This is a status test",
    };
    await emailService.sendEmail(email);
    expect(emailService.statusMap.get(email.to + email.subject)).to.satisfy(
      (status) => status.includes("Sent")
    );
  });
});

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildCareersEmail,
  getCareersMailConfig,
  validateResumeFile,
} from "../lib/careers-mail.js";

test("validateResumeFile accepts common resume document types", () => {
  assert.equal(validateResumeFile({ name: "resume.pdf", type: "application/pdf" }).ok, true);
  assert.equal(
    validateResumeFile({
      name: "resume.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }).ok,
    true
  );
  assert.equal(validateResumeFile({ name: "resume.doc", type: "application/msword" }).ok, true);
});

test("validateResumeFile rejects unsupported files", () => {
  const result = validateResumeFile({ name: "portfolio.png", type: "image/png" });
  assert.equal(result.ok, false);
  assert.match(result.error, /PDF, DOC, or DOCX/);
});

test("buildCareersEmail requires applicant identity and resume", async () => {
  const result = await buildCareersEmail({
    fields: { name: "", email: "candidate@example.com", phone: "9999999999" },
    resume: { name: "resume.pdf", type: "application/pdf", arrayBuffer: async () => new ArrayBuffer(0) },
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /Name, email, phone, and resume/);
});

test("buildCareersEmail creates an email payload with the resume attachment", async () => {
  const result = await buildCareersEmail({
    fields: {
      name: "Asha Patil",
      email: "asha@example.com",
      phone: "+91 99999 99999",
      position: "Automation Engineer",
      message: "Interested in PLC roles.",
    },
    resume: {
      name: "asha-resume.pdf",
      type: "application/pdf",
      arrayBuffer: async () => new TextEncoder().encode("resume").buffer,
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.mail.to, "Careers@intelliactind.com");
  assert.equal(result.mail.attachments.length, 1);
  assert.equal(result.mail.attachments[0].filename, "asha-resume.pdf");
  assert.match(result.mail.subject, /Asha Patil/);
  assert.match(result.mail.text, /Automation Engineer/);
});

test("getCareersMailConfig reads SMTP settings from environment", () => {
  const env = {
    SMTP_HOST: "smtp.example.com",
    SMTP_PORT: "2525",
    SMTP_USER: "mailer",
    SMTP_PASSWORD: "secret",
    MAIL_FROM: "Website <website@example.com>",
    CAREERS_TO_EMAIL: "hr@example.com",
  };

  const config = getCareersMailConfig(env);

  assert.equal(config.ok, true);
  assert.equal(config.transport.host, "smtp.example.com");
  assert.equal(config.transport.port, 2525);
  assert.equal(config.mailFrom, "Website <website@example.com>");
  assert.equal(config.careersTo, "hr@example.com");
});

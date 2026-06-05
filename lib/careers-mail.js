const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const allowedResumeExtensions = new Set(["pdf", "doc", "docx"]);

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getExtension(fileName) {
  const parts = clean(fileName).toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

export function validateResumeFile(file) {
  if (!file || typeof file === "string") {
    return { ok: false, error: "Resume/CV file is required." };
  }

  const extension = getExtension(file.name);
  const type = clean(file.type).toLowerCase();

  if (allowedResumeTypes.has(type) || allowedResumeExtensions.has(extension)) {
    return { ok: true };
  }

  return {
    ok: false,
    error: "Please upload your resume/CV as a PDF, DOC, or DOCX file.",
  };
}

export async function buildCareersEmail({ fields, resume, to = "Careers@intelliactind.com" }) {
  const name = clean(fields?.name);
  const email = clean(fields?.email);
  const phone = clean(fields?.phone);
  const position = clean(fields?.position) || "General Application";
  const message = clean(fields?.message) || "No additional message provided.";

  if (!name || !email || !phone || !resume || typeof resume === "string") {
    return { ok: false, error: "Name, email, phone, and resume/CV are required." };
  }

  const resumeValidation = validateResumeFile(resume);
  if (!resumeValidation.ok) {
    return resumeValidation;
  }

  const fileBytes = await resume.arrayBuffer();
  const content = Buffer.from(fileBytes);

  return {
    ok: true,
    mail: {
      to,
      replyTo: email,
      subject: `Career Application: ${name} - ${position}`,
      text: [
        "New career application received from the website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Position: ${position}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      attachments: [
        {
          filename: resume.name || "resume",
          content,
          contentType: resume.type || undefined,
        },
      ],
    },
  };
}

export function getCareersMailConfig(env = process.env) {
  const host = clean(env.SMTP_HOST);
  const portValue = clean(env.SMTP_PORT);
  const user = clean(env.SMTP_USER);
  const pass = clean(env.SMTP_PASSWORD);
  const mailFrom = clean(env.MAIL_FROM);
  const careersTo = clean(env.CAREERS_TO_EMAIL) || "Careers@intelliactind.com";

  if (!host || !portValue || !user || !pass || !mailFrom) {
    return {
      ok: false,
      error:
        "Career application email is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, and MAIL_FROM.",
    };
  }

  const port = Number.parseInt(portValue, 10);
  if (!Number.isFinite(port)) {
    return { ok: false, error: "SMTP_PORT must be a valid number." };
  }

  return {
    ok: true,
    transport: {
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    },
    mailFrom,
    careersTo,
  };
}

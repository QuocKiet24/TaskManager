import sendEmail from "./nodeMailer.js";

export const sendVerificationEmail = async (
  email,
  username,
  verificationToken
) => {
  // verification link
  const verificationLink = verificationToken;

  // send email
  const subject = "Email Verification - TaskManager";
  const send_to = email;
  const reply_to = "noreply@gmail.com";
  const template = "emailVerification";
  const send_from = process.env.USER_EMAIL;
  const name = username;
  const link = verificationLink;
  try {
    const response = await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (resetToken, email, username) => {
  // verification link
  const verificationLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // send email
  const subject = "Forgot Password - TaskManager";
  const send_to = email;
  const reply_to = "noreply@gmail.com";
  const template = "forgotPassword";
  const send_from = process.env.USER_EMAIL;
  const name = username;
  const link = verificationLink;
  try {
    const response = await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

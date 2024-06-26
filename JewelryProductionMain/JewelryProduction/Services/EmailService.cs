using JewelryProduction.Interface;
using MimeKit;
using MailKit.Net.Smtp;
using JewelryProduction.DTO.Account;

namespace JewelryProduction.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emainConfig;

        public EmailService(EmailConfiguration emailConfig)
        {
            _emainConfig = emailConfig;
        }

        public void SendEmail(MessageOTP message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(MessageOTP message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("email",_emainConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message.Content
            };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using var client = new SmtpClient();
            try
            {
                client.Connect(_emainConfig.SmtpServer, _emainConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emainConfig.UserName, _emainConfig.Password);
                client.Send(mailMessage);
            }
            catch
            {
                throw;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }

        void IEmailService.Send(MimeMessage mailMessage)
        {
            throw new NotImplementedException();
        }
    }
}

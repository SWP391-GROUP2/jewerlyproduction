using JewelryProduction.Interface;
using MimeKit;
using MailKit.Net.Smtp;
using JewelryProduction.DTO.Account;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emainConfig;
        private readonly UserManager<AppUser> _userManager;
        public EmailService(EmailConfiguration emailConfig, UserManager<AppUser> userManager)
        {
            _emainConfig = emailConfig;
            _userManager = userManager;
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
        public async Task SendEmail(string userId, string senderId, string content)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var sender = await _userManager.Users.FirstOrDefaultAsync(s => s.Id == senderId);
            var email = user.Email;

            var message = new MessageOTP(
            new string[] { email }, senderId, content);

            SendEmail(message);
        }
    }
}

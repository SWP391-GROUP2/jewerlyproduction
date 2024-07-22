using JewelryProduction.DTO.Account;
using MimeKit;

namespace JewelryProduction.Interface
{
    public interface IEmailService
    {
        void SendEmail(MessageOTP message);
        Task SendEmail(string userId, string senderId, string content);
        void Send(MimeMessage mailMessage);
    }
}

using JewelryProduction.DTO.Account;
using MimeKit;

namespace JewelryProduction.Interface
{
    public interface IEmailService
    {
        void SendEmail(MessageOTP message);
        void Send(MimeMessage mailMessage);
    }
}

using MimeKit;

namespace JewelryProduction.DTO.Account
{
    public class MessageOTP
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; } = null!;
        public string Content { get; set; } = null!;
        public MessageOTP(IEnumerable<string> to, string subject, string content)
        {
            To = new List<MailboxAddress>();
            To.AddRange(to.Select(x => new MailboxAddress("email", x)));
            Subject = subject;
            Content = content;
        }
    }
}

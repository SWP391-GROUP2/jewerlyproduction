using FluentValidation;

namespace JewelryProduction.API.Model.LoginModel
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.name).NotEmpty().WithMessage("Username is required")
                .MaximumLength(20).WithMessage("Username can not over 20 characters");

            RuleFor(x => x._phoneNumber).NotEmpty().WithMessage("Phone number is required")
                .MaximumLength(200).WithMessage("Phone number can not over 15 numbers");

            RuleFor(x => x._dateOfBirth).GreaterThan(DateTime.Now.AddYears(-100)).WithMessage("Birthday cannot greater than 100 years");

            RuleFor(x => x._email).NotEmpty().WithMessage("Email is required")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage("Email format not match");
            RuleFor(x => x._password).NotEmpty().WithMessage("Password is required")
                .MinimumLength(6).WithMessage("Password is at least 6 characters");

            RuleFor(x => x).Custom((request, context) =>
            {
                if (request._password != request._confirmPassword)
                {
                    context.AddFailure("Confirm password is not match");
                }
            });
        }
    }
}

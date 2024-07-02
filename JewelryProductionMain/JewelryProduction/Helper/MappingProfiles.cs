using AutoMapper;
using JewelryProduction.DTO.BasicDTO;

namespace JewelryProduction.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, AppUserDTO>()
            .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(src => src.Id
             ))
            .ForMember(
                dest => dest.Name,
                opt => opt.MapFrom(src => src.Name
             ))
            .ForMember(
                dest => dest.Email,
                opt => opt.MapFrom(src => src.Email
                ))
            .ForMember(
                    dest => dest.DateOfBirth,
                    opt => opt.MapFrom(src => src.DateOfBirth
                ))
            .ForMember(
                    dest => dest.Avatar,
                    opt => opt.MapFrom(src => src.Avatar
                ));
        }
    }
}

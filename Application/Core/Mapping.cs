using System;
using AutoMapper;
using Domain;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Activity, Activity>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Venue, opt => opt.MapFrom(src => src.Venue));
        }
    }
}

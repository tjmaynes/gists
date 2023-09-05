using AutoMapper;
using BlockFlixter.Domain.Core.Entities;

namespace BlockFlixter.Domain.Core.Mappings;

public class BlockFlixterProfile : Profile
{
    public BlockFlixterProfile()
    {
        CreateMap<CustomerEntity, CustomerDTO>();
        CreateMap<MovieEntity, MovieDTO>();
    }
}

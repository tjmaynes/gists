using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class GetCustomerByIdHandler : IRequestHandler<GetCustomerRequest, CustomerDTO>
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;

    public GetCustomerByIdHandler(
        ICustomerRepository customerRepository,
        IMapper mapper
    )
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<CustomerDTO> Handle(GetCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.GetCustomerById(request.Id);
        return _mapper.Map<CustomerDTO>(result);
    }
}

public record GetCustomerRequest : IRequest<CustomerDTO>
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
}

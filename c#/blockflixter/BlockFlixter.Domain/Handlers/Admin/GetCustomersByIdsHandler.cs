using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class GetCustomersByIdsHandler : IRequestHandler<GetCustomersRequest, CustomerDTO[]>
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;

    public GetCustomersByIdsHandler(
        ICustomerRepository customerRepository,
        IMapper mapper
    )
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<CustomerDTO[]> Handle(GetCustomersRequest request, CancellationToken cancellationToken)
    {
        var results = await _customerRepository.GetCustomersByIds(request.Ids);
        return _mapper.Map<CustomerDTO[]>(results);
    }
}

public readonly struct GetCustomersRequest : IRequest<CustomerDTO[]>
{
    [JsonPropertyName("ids")]
    public Guid[] Ids { get; init; }
}

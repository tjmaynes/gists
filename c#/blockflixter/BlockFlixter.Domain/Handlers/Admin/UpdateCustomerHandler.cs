using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

internal class UpdateCustomerHandler : IRequestHandler<UpdateCustomerRequest, CustomerDTO>
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;

    public UpdateCustomerHandler(
        ICustomerRepository customerRepository,
        IMapper mapper
    )
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<CustomerDTO> Handle(UpdateCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.UpdateCustomer(request.Id, request.Customer);
        return _mapper.Map<CustomerDTO>(result);
    }
}

public readonly struct UpdateCustomerRequest : IRequest<CustomerDTO>
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
    [JsonPropertyName("customer")]
    public CustomerDTO Customer { get; init; }
}

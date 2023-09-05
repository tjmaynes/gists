using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class AddCustomerHandler : IRequestHandler<NewCustomerRequest, Guid>
{
    private readonly ICustomerRepository _customerRepository;

    public AddCustomerHandler(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<Guid> Handle(NewCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.AddNewCustomer(request.Customer);
        return result.Id;
    }
}

public readonly struct NewCustomerRequest : IRequest<Guid>
{
    [JsonPropertyName("customer")]
    public CustomerDTO Customer { get; init; }
}

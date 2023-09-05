using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class RemoveCustomerHandler : IRequestHandler<RemoveCustomerRequest, Guid>
{
    private readonly ICustomerRepository _customerRepository;

    public RemoveCustomerHandler(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<Guid> Handle(RemoveCustomerRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.RemoveCustomer(request.Id);
        return result.Id;
    }
}

public readonly struct RemoveCustomerRequest : IRequest<Guid>
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
}
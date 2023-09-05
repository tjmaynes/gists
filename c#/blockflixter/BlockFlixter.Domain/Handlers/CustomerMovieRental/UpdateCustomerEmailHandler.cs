using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;

namespace BlockFlixter.Domain.Handlers.CustomerMovieRental;

public class UpdateCustomerEmailHandler : IRequestHandler<CustomerUpdateEmailRequest, CustomerEntity>
{
    private readonly ICustomerRepository _customerRepository;

    public UpdateCustomerEmailHandler(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<CustomerEntity> Handle(CustomerUpdateEmailRequest request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.UpdateCustomerEmail(request.Id, request.Email);
        return result;
    }
}

public class CustomerUpdateEmailRequest : IRequest<CustomerEntity>
{
    public Guid Id { get; init; }
    public string Email { get; init; } = string.Empty;
}

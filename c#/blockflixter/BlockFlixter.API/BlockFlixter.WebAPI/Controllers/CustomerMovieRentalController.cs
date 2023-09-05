using Microsoft.AspNetCore.Mvc;
using MediatR;
using BlockFlixter.Domain.Handlers.CustomerMovieRental;
using BlockFlixter.Domain.Core.Entities;

namespace BlockFlixter.WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerMovieRentalController : ControllerBase
{
    private IMediator _mediator;
    private readonly ILogger<CustomerMovieRentalController> _logger;

    public CustomerMovieRentalController(IMediator mediator, ILogger<CustomerMovieRentalController> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }

    [HttpPost(Name = "CheckMovieAvailability")]
    public async Task<CustomerRentalAvailabilityResponse> CheckMovieAvailability([FromBody] CustomerRentalAvailabilityRequest request)
    {
        var result = await _mediator.Send(request);
        return result;
    }

    [HttpPost(Name = "NewMovieRental")]
    public async Task<CustomerNewRentalResponse> NewMovieRental([FromBody] CustomerNewRentalRequest request)
    {
        var result = await _mediator.Send(request);
        return result;
    }

    [HttpPut(Name = "UpdateCustomerEmail")]
    public async Task<CustomerEntity> UpdateCustomerEmail([FromBody] CustomerUpdateEmailRequest request)
    {
        var result = await _mediator.Send(request);
        return result;
    }
}

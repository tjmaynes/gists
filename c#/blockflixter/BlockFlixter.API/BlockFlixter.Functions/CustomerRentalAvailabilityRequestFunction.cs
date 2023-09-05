using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using BlockFlixter.Domain.Handlers.CustomerMovieRental;
using System.Text.Json;
using MediatR;

namespace BlockFlixter.API.Functions;

public class CustomerRentalAvailabilityRequestFunction
{
    private readonly IMediator _mediator;
    private readonly ILogger _logger;

    public CustomerRentalAvailabilityRequestFunction(IMediator mediator, ILoggerFactory loggerFactory)
    {
        _mediator = mediator;
        _logger = loggerFactory.CreateLogger<CustomerRentalAvailabilityRequestFunction>();
    }

    [Function("CustomerRentalAvailabilityRequestFunction")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
    {
        CustomerRentalAvailabilityRequest? request = JsonSerializer.Deserialize<CustomerRentalAvailabilityRequest>(req.Body);
        if (request == null) return req.CreateResponse(HttpStatusCode.BadRequest);

        var result = await _mediator.Send(request);

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(result);
        return response;
    }
}

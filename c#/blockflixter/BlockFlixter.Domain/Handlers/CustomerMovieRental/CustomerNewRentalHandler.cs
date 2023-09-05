using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.CustomerMovieRental;

public class CustomerNewRentalHandler : IRequestHandler<CustomerNewRentalRequest, CustomerNewRentalResponse>
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMovieInventoryRepository _movieInventoryRepository;
    private readonly IMapper _mapper;

    public CustomerNewRentalHandler(ICustomerRepository customerRepository, IMovieInventoryRepository movieInventoryRepository, IMapper mapper)
    {
        _customerRepository = customerRepository;
        _movieInventoryRepository = movieInventoryRepository;
        _mapper = mapper;
    }

    public async Task<CustomerNewRentalResponse> Handle(CustomerNewRentalRequest request, CancellationToken cancellationToken)
    {
        switch (await this.GetCustomerRentalStatus(request.CustomerID))
        {
            case CustomerSatisfactoryRentalHistory _:
                var rentedMovies = new List<MovieRentalInfo>();
                var unavailableMovies = new List<MovieAvailabilityInfo>();

                foreach (Guid movieID in request.MovieIDs)
                {
                    switch (await this.RentMovie(movieID, request.CustomerID))
                    {
                        case MovieRentalInfo movieRentalInfo:
                            rentedMovies.Add(movieRentalInfo);
                            break;
                        case MovieAvailabilityInfo movieAvailablityInfo:
                            unavailableMovies.Add(movieAvailablityInfo);
                            break;
                    }
                }

                return new SatisfactoryNewRentalResponse(rentedMovies.ToArray(), unavailableMovies.ToArray(), new DateTime());
            case CustomerOutstandingLatefeesRentalHistory latefeesStatus:
                return new UnsatisfactoryNewRentalResponse(latefeesStatus.LateFees, new DateTime());
            default:
                throw new NotImplementedException();
        }
    }

    private Task<CustomerRentalStatus> GetCustomerRentalStatus(Guid customerId)
    {
        throw new NotImplementedException();
    }

    private Task<MovieRentalResult> RentMovie(Guid movieId, Guid customerId)
    {
        throw new NotImplementedException();
    }
}

public record CustomerNewRentalRequest : IRequest<CustomerNewRentalResponse>
{
    [JsonPropertyName("customer_id")]
    public Guid CustomerID { get; init; }

    [JsonPropertyName("movie_ids")]
    public Guid[] MovieIDs { get; init; } = Array.Empty<Guid>();
}

public record CustomerNewRentalResponse
{
    [JsonPropertyName("timestamp")]
    public DateTime Timestamp { get; private set; }

    public CustomerNewRentalResponse(DateTime timestamp)
    {
        Timestamp = timestamp;
    }
}

public record SatisfactoryNewRentalResponse : CustomerNewRentalResponse
{
    [JsonPropertyName("rented_movies")]
    public MovieRentalInfo[] RentedMovies { get; private set; }

    [JsonPropertyName("unavailable_movies")]
    public MovieAvailabilityInfo[] UnavailableMovies { get; private set; }

    public SatisfactoryNewRentalResponse(MovieRentalInfo[] rentedMovies, MovieAvailabilityInfo[] unavailableMovies, DateTime timestamp) : base(timestamp)
    {
        RentedMovies = rentedMovies;
        UnavailableMovies = unavailableMovies;
    }
}

public record UnsatisfactoryNewRentalResponse : CustomerNewRentalResponse
{
    [JsonPropertyName("latefees")]
    public CustomerLateFeeInfo[] LateFees { get; private set; }

    public UnsatisfactoryNewRentalResponse(CustomerLateFeeInfo[] lateFees, DateTime timestamp) : base(timestamp)
    {
        LateFees = lateFees;
    }
}
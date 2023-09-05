using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.CustomerMovieRental;

public class CheckMovieAvailabilityHandler : IRequestHandler<CustomerRentalAvailabilityRequest, CustomerRentalAvailabilityResponse>
{
    private readonly IMovieInventoryRepository _movieInventoryRepository;
    private readonly ICustomerRentalHistoryRepository _customerRentalHistoryRepository;

    public CheckMovieAvailabilityHandler(IMovieInventoryRepository movieInventoryRepository, ICustomerRentalHistoryRepository customerRentalHistoryRepository)
    {
        _movieInventoryRepository = movieInventoryRepository;
        _customerRentalHistoryRepository = customerRentalHistoryRepository;
    }

    public async Task<CustomerRentalAvailabilityResponse> Handle(CustomerRentalAvailabilityRequest request, CancellationToken cancellationToken)
    {
        var availableMovies = new List<AvailableMovie>();
        var unavailableMovies = new List<UnavailableMovie>();

        foreach (MovieEntity movieEntity in await _movieInventoryRepository.GetMoviesByIds(request.MovieIDs))
        {
            if (movieEntity.AvailableCount > 0)
            {
                availableMovies.Add(new AvailableMovie(movieEntity));
            }
            else
            {
                var limitBy = movieEntity.TotalCount - movieEntity.AvailableCount;
                var result = await _customerRentalHistoryRepository.GetHistoryByMovieId(movieEntity.Id, limitBy);
                
                var orderedResults = result.OrderBy(s => s.CreatedAt);

                var latest = orderedResults.First().CreatedAt;
                var earliest = orderedResults.Last().CreatedAt;
                var estimatedWaitTime = $"Sometime between {earliest.Month}-{earliest.Day} and {latest.Month}-{latest.Day}";
                
                unavailableMovies.Add(new UnavailableMovie(movieEntity, estimatedWaitTime));
            }
        }

        return new CustomerRentalAvailabilityResponse
        {
            AvailableMovies = availableMovies.ToArray(),
            UnavailableMovies = unavailableMovies.ToArray()
        };
    }
}

public record CustomerRentalAvailabilityRequest : IRequest<CustomerRentalAvailabilityResponse>
{
    [JsonPropertyName("movie_ids")]
    public Guid[] MovieIDs { get; init; } = Array.Empty<Guid>();

    public CustomerRentalAvailabilityRequest(Guid[] movieIDs)
    {
        MovieIDs = movieIDs;
    }
}

public record CustomerRentalAvailabilityResponse
{
    [JsonPropertyName("available_movies")]
    public MovieAvailabilityInfo[] AvailableMovies { get; init; } = Array.Empty<AvailableMovie>();
    
    [JsonPropertyName("unavailable_movies")]

    public MovieAvailabilityInfo[] UnavailableMovies { get; init; } = Array.Empty<UnavailableMovie>();

}

public record MovieRentalResult(MovieEntity Movie);

public enum MovieAvailabilityStatus
{
    AVAILABLE,
    NOT_AVAILABLE
}

public record MovieAvailabilityInfo : MovieRentalResult
{
    public MovieAvailabilityStatus Status { get; init; }

    public MovieAvailabilityInfo(MovieEntity movie, MovieAvailabilityStatus status) :
        base(movie)
    {
        Status = status;
    }
}

public record AvailableMovie : MovieAvailabilityInfo
{
    public AvailableMovie(MovieEntity movie) :
        base(movie, MovieAvailabilityStatus.AVAILABLE)
    { }
}

public record UnavailableMovie : MovieAvailabilityInfo
{
    public string EstimatedWaitTime { get; private set; }

    public UnavailableMovie(MovieEntity movie, string estimatedWaitTime) :
        base(movie, MovieAvailabilityStatus.NOT_AVAILABLE)
    {
        EstimatedWaitTime = estimatedWaitTime;
    }
}

public record MovieRentalInfo : MovieRentalResult
{
    public DateTime ReturnDate { get; private set; }

    public MovieRentalInfo(MovieEntity movie, DateTime returnDate) :
        base(movie)
    {
        ReturnDate = returnDate;
    }
}

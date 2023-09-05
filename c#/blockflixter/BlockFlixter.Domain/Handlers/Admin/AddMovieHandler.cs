using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class AddMovieHandler : IRequestHandler<AddMovieRequest, Guid>
{
    private readonly IMovieInventoryRepository _movieRepository;

    public AddMovieHandler(IMovieInventoryRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    public async Task<Guid> Handle(AddMovieRequest request, CancellationToken cancellationToken)
    {
        var result = await _movieRepository.AddNewMovie(request.Movie);
        return result.Id;
    }
}

public record AddMovieRequest : IRequest<Guid>
{
    [JsonPropertyName("movie")]
    public MovieDTO Movie { get; init; }

    public AddMovieRequest(MovieDTO movie) { Movie = movie; }
}

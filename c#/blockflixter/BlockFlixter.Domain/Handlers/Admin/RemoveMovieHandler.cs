using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class RemoveMovieHandler : IRequestHandler<RemoveMovieRequest, Guid>
{
    private readonly IMovieInventoryRepository _movieRepository;

    public RemoveMovieHandler(IMovieInventoryRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    public async Task<Guid> Handle(RemoveMovieRequest request, CancellationToken cancellationToken)
    {
        var result = await _movieRepository.RemoveMovie(request.Id);
        return result.Id;
    }
}

public readonly struct RemoveMovieRequest : IRequest<Guid>
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
}
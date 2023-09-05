using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class GetMoviesByIdsHandler : IRequestHandler<GetMoviesRequest, MovieDTO[]>
{
    private readonly IMovieInventoryRepository _movieRepository;
    private readonly IMapper _mapper;

    public GetMoviesByIdsHandler(
        IMovieInventoryRepository movieRepository,
        IMapper mapper
    )
    {
        _movieRepository = movieRepository;
        _mapper = mapper;
    }

    public async Task<MovieDTO[]> Handle(GetMoviesRequest request, CancellationToken cancellationToken)
    {
        var results = await _movieRepository.GetMoviesByIds(request.Ids);
        return _mapper.Map<MovieDTO[]>(results);
    }
}

public readonly struct GetMoviesRequest : IRequest<MovieDTO[]>
{
    [JsonPropertyName("ids")]
    public Guid[] Ids { get; init; }
}
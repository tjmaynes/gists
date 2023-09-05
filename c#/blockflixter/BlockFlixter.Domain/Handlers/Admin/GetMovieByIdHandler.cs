using AutoMapper;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using MediatR;
using System.Text.Json.Serialization;

namespace BlockFlixter.Domain.Handlers.Admin;

public class GetMovieByIdHandler : IRequestHandler<GetMovieRequest, MovieDTO>
{
    private readonly IMovieInventoryRepository _movieRepository;
    private readonly IMapper _mapper;

    public GetMovieByIdHandler(
        IMovieInventoryRepository movieRepository,
        IMapper mapper
    )
    {
        _movieRepository = movieRepository;
        _mapper = mapper;
    }

    public async Task<MovieDTO> Handle(GetMovieRequest request, CancellationToken cancellationToken)
    {
        var result = await _movieRepository.GetMovieById(request.Id);
        return _mapper.Map<MovieDTO>(result);
    }
}

public readonly struct GetMovieRequest : IRequest<MovieDTO>
{
    [JsonPropertyName("id")]
    public Guid Id { get; init; }
}

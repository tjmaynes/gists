using BlockFlixter.Domain.Core.Entities;

namespace BlockFlixter.Domain.Core.Interfaces;

public interface IMovieInventoryRepository
{
    Task<MovieEntity?> GetMovieById(Guid id);
    Task<MovieEntity[]> GetMoviesByIds(Guid[] ids);
    Task<MovieEntity> AddNewMovie(MovieDTO newMovie);
    Task<MovieEntity> UpdateMovie(Guid id, MovieDTO updatedMovie);
    Task<MovieEntity> RentMovie(Guid id);
    Task<MovieEntity> RemoveMovie(Guid id);
}
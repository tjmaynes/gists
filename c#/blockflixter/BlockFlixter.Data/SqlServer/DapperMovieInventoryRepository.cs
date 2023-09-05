using BlockFlixter.Domain.Core.Interfaces;
using BlockFlixter.Domain.Core.Entities;
using System.Data;

namespace BlockFlixter.Data.SqlServer;

public class DapperMovieInventoryRepository : IMovieInventoryRepository
{
    private readonly IDbConnection _dbConnection;

    public DapperMovieInventoryRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public Task<MovieEntity> AddNewMovie(MovieDTO newMovie)
    {
        throw new NotImplementedException();
    }

    public Task<MovieEntity?> GetMovieById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<MovieEntity[]> GetMoviesByIds(Guid[] ids)
    {
        throw new NotImplementedException();
    }

    public Task<MovieEntity> RemoveMovie(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<MovieEntity> RentMovie(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<MovieEntity> UpdateMovie(Guid id, MovieDTO updatedMovie)
    {
        throw new NotImplementedException();
    }
}
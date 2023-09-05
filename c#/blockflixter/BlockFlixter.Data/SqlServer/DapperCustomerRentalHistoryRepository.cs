using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using System.Data;

namespace BlockFlixter.Data.SqlServer;

public class DapperCustomerRentalHistoryRepository : ICustomerRentalHistoryRepository
{
    private readonly IDbConnection _dbConnection;

    public DapperCustomerRentalHistoryRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public Task<MovieEntity> AddNewRentalHistoryEntry(Guid customerId, Guid movieId)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerRentalHistoryEntity[]> GetHistoryByCustomerId(Guid customerId)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerRentalHistoryEntity[]> GetHistoryByMovieId(Guid movieId, decimal limit)
    {
        throw new NotImplementedException();
    }
}

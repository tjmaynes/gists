using BlockFlixter.Domain.Core.Entities;

namespace BlockFlixter.Domain.Core.Interfaces;

public interface ICustomerRentalHistoryRepository
{
    Task<CustomerRentalHistoryEntity[]> GetHistoryByCustomerId(Guid customerId);
    Task<CustomerRentalHistoryEntity[]> GetHistoryByMovieId(Guid movieId, decimal limit);
    Task<MovieEntity> AddNewRentalHistoryEntry(Guid customerId, Guid movieId);
}

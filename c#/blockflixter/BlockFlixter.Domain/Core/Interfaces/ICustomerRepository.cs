using BlockFlixter.Domain.Core.Entities;

namespace BlockFlixter.Domain.Core.Interfaces;

public interface ICustomerRepository
{
    Task<CustomerEntity?> GetCustomerById(Guid customerId);
    Task<CustomerEntity[]> GetCustomersByIds(Guid[] customerIds);
    Task<CustomerEntity?> FindCustomerByUsername(string username);
    Task<CustomerEntity> AddNewCustomer(CustomerDTO newCustomer);
    Task<CustomerEntity> UpdateCustomer(Guid customerId, CustomerDTO customer);
    Task<CustomerEntity> UpdateCustomerEmail(Guid customerId, string email);
    Task<CustomerEntity> RemoveCustomer(Guid customerId);
}

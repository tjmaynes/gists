using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Domain.Core.Interfaces;
using System.Data;
using Dapper;

namespace BlockFlixter.Data.SqlServer;

public class DapperCustomerRepository : ICustomerRepository
{
    private readonly IDbConnection _dbConnection;

    public DapperCustomerRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<CustomerEntity> AddNewCustomer(CustomerDTO newCustomer)
    {
        var insertSqlQuery = "INSERT INTO Customers (FirstName, LastName, Email, Username, BirthDate) VALUES (@FirstName, @LastName, @Email, @Username, @BirthDate)";
        var result = await _dbConnection.ExecuteAsync(insertSqlQuery, new
        {
            newCustomer.FirstName,
            newCustomer.LastName,
            newCustomer.Email,
            newCustomer.Username,
            newCustomer.BirthDate
        });

        if (result == 1)
        {
            var customer = await FindCustomerByUsername(newCustomer.Username);
            if (customer != null) return customer;
            else throw new Exception();
        }
        else
        {
            throw new Exception();
        }
    }

    public async Task<CustomerEntity?> GetCustomerById(Guid customerId)
    {
        var sql = "SELECT * FROM Customers WHERE id = @id";
        return await _dbConnection.QueryFirstOrDefaultAsync<CustomerEntity?>(sql, new { id = customerId.ToString() });
    }

    public async Task<CustomerEntity[]> GetCustomersByIds(Guid[] customerIds)
    {
        var ids = customerIds.Select(id => id.ToString()).ToArray();
        var sql = "SELECT * FROM Customers WHERE id IN @ids";
        var result = await _dbConnection.QueryAsync<CustomerEntity>(sql, new { ids = ids });
        return result.ToArray();
    }

    public Task<CustomerEntity> RemoveCustomer(Guid customerId)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerEntity> UpdateCustomer(Guid customerId, CustomerDTO customer)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerEntity> UpdateCustomerEmail(Guid customerId, string email)
    {
        throw new NotImplementedException();
    }

    public async Task<CustomerEntity?> FindCustomerByUsername(string username)
    {
        var fetchSqlQuery = "SELECT * FROM Customers WHERE username = @username";
        return await _dbConnection.QueryFirstAsync<CustomerEntity?>(fetchSqlQuery, new { username = username });
    }
}
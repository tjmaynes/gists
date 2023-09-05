using BlockFlixter.Data.SqlServer;
using BlockFlixter.Domain.Core.Entities;
using BlockFlixter.Data.Tests.SqlServer.Helpers;
using Moq;
using Moq.Dapper;
using Dapper;
using NUnit.Framework;
using System.Data;

namespace BlockFlixter.Data.Tests.SqlServer.UnitTests;

[TestFixture]
public class DapperCustomerRepositoryUnitTests
{
/*    [Test]
    public async Task AddCustomer_WhenOnSuccess_ReturnsTrue()
    {
        var connection = new Mock<IDbConnection>();

        var expectedId = Guid.NewGuid();

        var expected = Fixtures.CreateCustomer(expectedId);

        var given = new CustomerDTO
        {
            FirstName = expected.FirstName,
            LastName = expected.LastName,
            Email = expected.Email,
            Username = expected.Username,
            BirthDate = expected.BirthDate
        };

        var expectedInsertSqlQuery = "INSERT INTO Customers (first_name, last_name, email, username, birth_date) VALUES (@FirstName, @LastName, @Email, @Username, @BirthDate)";
        connection.SetupDapperAsync(c => c.ExecuteAsync(expectedInsertSqlQuery, new
        {
            given.FirstName,
            given.LastName,
            given.Email,
            given.Username,
            given.BirthDate
        }, null, null, null))
            .ReturnsAsync(1);

        var sut = new DapperCustomerRepository(connection.Object);

        var actual = await sut.AddNewCustomer(given);

        Assert.That(actual, Is.True);
    }

    [Test]
    public async Task AddCustomer_WhenOnFailure_ReturnsFalse()
    {
        var connection = new Mock<IDbConnection>();

        var expectedId = Guid.NewGuid();

        var expected = Fixtures.CreateCustomer(expectedId);

        var given = new CustomerDTO
        {
            FirstName = expected.FirstName,
            LastName = expected.LastName,
            Email = expected.Email,
            Username = expected.Username,
            BirthDate = expected.BirthDate
        };

        var expectedInsertSqlQuery = "INSERT INTO Customers (first_name, last_name, email, username, birth_date) VALUES (@FirstName, @LastName, @Email, @Username, @BirthDate)";
        connection.SetupDapperAsync(c => c.ExecuteAsync(expectedInsertSqlQuery, new
        {
            given.FirstName,
            given.LastName,
            given.Email,
            given.Username,
            given.BirthDate
        }, null, null, null))
            .ReturnsAsync(0);

        var sut = new DapperCustomerRepository(connection.Object);

        var actual = await sut.AddNewCustomer(given);

        Assert.That(actual, Is.False);
    }*/

    [Test]
    public async Task GetCustomerById_WhenACustomerExists_ReturnsCustomerById()
    {
        var connection = new Mock<IDbConnection>();

        var expectedId = Guid.NewGuid();
        var expected = Fixtures.CreateCustomer(expectedId);
        var expectedSqlQuery = "SELECT * FROM Customers WHERE id = @id";

        connection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync<CustomerEntity?>(expectedSqlQuery, new { id = expectedId.ToString() }, null, null, null))
                  .ReturnsAsync(expected);

        var sut = new DapperCustomerRepository(connection.Object);

        var actual = await sut.GetCustomerById(expectedId);

        Assert.That(actual, Is.EqualTo(expected));
    }

    [Test]
    public async Task GetCustomerById_WhenACustomerDoesNotExist_ReturnNull()
    {
        var connection = new Mock<IDbConnection>();

        var expectedId = Guid.NewGuid();
        var expectedSqlQuery = "SELECT * FROM Customers WHERE id = @id";

        connection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync<CustomerEntity?>(expectedSqlQuery, new { id = expectedId.ToString() }, null, null, null))
                  .Returns(Task.FromResult<CustomerEntity?>(null));

        var sut = new DapperCustomerRepository(connection.Object);

        var actual = await sut.GetCustomerById(expectedId);

        Assert.That(actual, Is.Null);
    }

    [Test]
    public async Task GetCustomersByIds_WhenACustomersExist_ShouldReturnNonEmptyArray()
    {
        var connection = new Mock<IDbConnection>();

        var expectedId1 = Guid.NewGuid();
        var expectedId2 = Guid.NewGuid();
        var ids = new[] { expectedId1, expectedId2 };

        var expected = new[] { Fixtures.CreateCustomer(expectedId1), Fixtures.CreateCustomer(expectedId2) };
        var expectedSqlQuery = "SELECT * FROM Customers WHERE id IN @ids";

        connection.SetupDapperAsync(c => c.QueryAsync<CustomerEntity>(expectedSqlQuery, new { ids }, null, null, null))
                  .ReturnsAsync(expected);

        var sut = new DapperCustomerRepository(connection.Object);

        var actual = await sut.GetCustomersByIds(ids);

        Assert.That(actual, Is.EquivalentTo(expected));
    }
}

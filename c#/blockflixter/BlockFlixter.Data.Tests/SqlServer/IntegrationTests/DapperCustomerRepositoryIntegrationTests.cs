using BlockFlixter.Data.SqlServer;
using BlockFlixter.Data.Tests.SqlServer.Helpers;
using BlockFlixter.Domain.Core.Entities;
using DotNet.Testcontainers.Builders;
using Microsoft.Data.SqlClient;
using NUnit.Framework;
using Testcontainers.MsSql;

namespace BlockFlixter.Data.Tests.SqlServer.IntegrationTests;

[TestFixture]
public class DapperCustomerRepositoryIntegrationTests
{
    [Test]
    public async Task AddNewCustomer_WhenCustomerHasUniqueUsername_ReturnsNewCustomerEntity()
    {
        var msSqlContainer = new MsSqlBuilder().Build();
        await msSqlContainer.StartAsync();

        var connection = new SqlConnection(msSqlContainer.GetConnectionString());

        var expected = Fixtures.CreateCustomer(Guid.Empty);

        var givenCustomer = new CustomerDTO
        {
            FirstName = expected.FirstName,
            LastName = expected.LastName,
            Email = expected.Email,
            Username = expected.Username,
            BirthDate = expected.BirthDate
        };

        var sut = new DapperCustomerRepository(connection);

        var actual = await sut.AddNewCustomer(givenCustomer);

        Assert.That(actual.FirstName, Is.EqualTo(expected.FirstName));
        Assert.That(actual.LastName, Is.EqualTo(expected.LastName));
        Assert.That(actual.Email, Is.EqualTo(expected.Email));
        Assert.That(actual.Username, Is.EqualTo(expected.Username));
        Assert.That(actual.Id, Is.Not.Null);
        Assert.That(actual.CreatedAt, Is.Not.Null);
        Assert.That(actual.UpdatedAt, Is.Not.Null);
    }
}

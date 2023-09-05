using BlockFlixter.Domain.Core.Entities;
using Bogus;

namespace BlockFlixter.Data.Tests.SqlServer.Helpers;

public class Fixtures
{
    public static CustomerEntity CreateCustomer(Guid id)
    {
        return new Faker<CustomerEntity>()
            .StrictMode(true)
            .RuleFor(o => o.Id, _ => id)
            .RuleFor(o => o.FirstName, f => f.Name.FirstName())
            .RuleFor(o => o.LastName, f => f.Name.LastName())
            .RuleFor(o => o.Email, f => f.Person.Email)
            .RuleFor(o => o.BirthDate, f => f.Person.DateOfBirth)
            .RuleFor(o => o.Username, f => f.Person.UserName)
            .RuleFor(o => o.CreatedAt, _ => new DateTime())
            .RuleFor(o => o.UpdatedAt, f => new DateTime());
    }
}

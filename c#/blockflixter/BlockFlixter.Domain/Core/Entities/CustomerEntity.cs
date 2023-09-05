namespace BlockFlixter.Domain.Core.Entities;

public record CustomerEntity
{
    public Guid Id { get; init; }

    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Username { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public DateTime BirthDate { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}

public record CustomerDTO
{
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Username { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public DateTime BirthDate { get; init; }
}

public record CustomerRentalStatus
{
    public CustomerRentalHistoryStatus Status { get; init; }

    public CustomerRentalStatus(CustomerRentalHistoryStatus status)
    {
        Status = status;
    }
}

public enum CustomerRentalHistoryStatus
{
    SATISFACTORY,
    OUTSTANDING_LATE_FEES
}

public record CustomerSatisfactoryRentalHistory : CustomerRentalStatus
{
    public CustomerRentalHistoryDTO[] History { get; init; }

    public CustomerSatisfactoryRentalHistory(CustomerRentalHistoryDTO[] history) :
        base(CustomerRentalHistoryStatus.SATISFACTORY)
    {
        History = history;
    }
}

public record CustomerOutstandingLatefeesRentalHistory : CustomerRentalStatus
{
    public CustomerLateFeeInfo[] LateFees { get; init; }

    public CustomerOutstandingLatefeesRentalHistory(CustomerLateFeeInfo[] lateFees) :
        base(CustomerRentalHistoryStatus.OUTSTANDING_LATE_FEES)
    {
        LateFees = lateFees;
    }
}

public record CustomerLateFeeInfo
{
    public Guid MovieID { get; init; }
    public decimal AmountOwed { get; init; }
}
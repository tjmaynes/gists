namespace BlockFlixter.Domain.Core.Entities;

public record CustomerRentalHistoryEntity : BaseEntity
{
    public Guid CustomerID { get; init; }
    public Guid MovieID { get; init; }
    public DateTime CheckoutTimestamp { get; init; }
    public DateTime? ReturnTimestamp { get; init; }

    public CustomerRentalHistoryEntity(Guid id, Guid customerID, Guid movieID, DateTime checkoutTimestamp, DateTime? returnTimestamp, DateTime createdAt) :
        base(id, createdAt, new DateTime())
    {
        CustomerID = customerID;
        MovieID = movieID;
        CheckoutTimestamp = checkoutTimestamp;
        ReturnTimestamp = returnTimestamp;
    }
}

public record CustomerRentalHistoryDTO
{
    public Guid CustomerID { get; init; }
    public Guid MovieID { get; init; }
    public DateTime CheckoutTimestamp { get; init; }
    public DateTime? ReturnTimestamp { get; init; }

    public CustomerRentalHistoryDTO(Guid customerID, Guid movieID, DateTime checkoutTimestamp, DateTime? returnTimestamp)
    {
        CustomerID = customerID;
        MovieID = movieID;
        CheckoutTimestamp = checkoutTimestamp;
        ReturnTimestamp = returnTimestamp;
    }
}

namespace BlockFlixter.Domain.Core.Entities;

public record MovieEntity : BaseEntity
{
    public string Title { get; init; }
    public Genre Genre { get; init; }
    public RentalFormat Format { get; init; }
    public string[] Cast { get; init; }
    public Guid RatingID { get; init; }
    public int AvailableCount { get; init; }
    public int TotalCount { get; init; }

    public MovieEntity(Guid id, string title, RentalFormat format, Genre genre, string[] cast, Guid ratingId, int availableCount, int totalCount, DateTime createdAt) :
        base(id, createdAt, new DateTime())
    {
        Title = title;
        Format = format;
        Genre = genre;
        Cast = cast;
        RatingID = ratingId;
        AvailableCount = availableCount;
        TotalCount = totalCount;
    }
}

public record MovieDTO(
    string Title,
    Genre Genre,
    RestrictionCode RestrictionCode,
    RentalFormat Format,
    string[] Cast,
    int AvailableCount,
    int TotalCount
);


public enum Genre
{
    HORROR,
    ROMANCE
}

public enum RentalFormat
{
    VHS,
    DVD,
    BluRay
}

public enum RestrictionCode
{
    G,
    PG13,
    R,
    NC17
}
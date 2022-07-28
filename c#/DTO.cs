using Linq;

public interface DTO<T> {
    T ToDTO();
}

public class Product: DTO<ProductDTO> {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public static Product Create(int id, string name) {
        Product product = new Product();
        product.Id = id;
        product.Name = name;

        return product;
    }

    public ProductDTO ToDTO() { return new ProductDTO(Id, Name); }
}

public readonly record struct ProductDTO(int Id, string Name);

public static class Extensions {
    public static T[] ToDTOs<T>(this DTO<T>[] array) {
        return array.Select(x => x.ToDTO()).ToArray();
    }
}

Product[] products = new []{
    Product.Create(0, "Something")
};

var productDTOs = products.ToDTOs();
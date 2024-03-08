using Microsoft.EntityFrameworkCore;

namespace ProductListingAPI.Models
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {

        }
        public required DbSet<Product> ProductDatas { get; set; } 

    }
}

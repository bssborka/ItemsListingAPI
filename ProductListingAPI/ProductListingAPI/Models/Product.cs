using System.ComponentModel.DataAnnotations;

namespace ProductListingAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int InStock { get; set; }
        [Required]
        public int Price { get; set; }
        public string Description { get; set; } = "";
    }
}

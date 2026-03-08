namespace ReportServer.Models
{
    public class ItemsModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public int price { get; set; }
        public int priority { get; set; }
        public string url { get; set; }
    }
    public class ItemsModelMultiple
    {
        public string name { get; set; }
        public string description { get; set; }
        public int price { get; set; }  
        public string  imageURL { get; set; }  

        public string name2 { get; set; }
        public string description2 { get; set; }
        public int price2 { get; set; }
        public string imageURL2 { get; set; }
    }
    public static class BufferModel
    {
        public static List<ItemsModel> reportItems { get; set; }
    }
}

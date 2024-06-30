namespace JewelryProduction.Entities
{
    public class WorkSchedule
    {
        public string ScheduleId { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }

        public int RequiredEmployees { get; set; }
    }
}

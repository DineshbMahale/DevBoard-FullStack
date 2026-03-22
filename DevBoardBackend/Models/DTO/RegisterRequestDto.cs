namespace DevBoardBackend.Models.DTO
{
    public class RegisterRequestDto
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email {  get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string role {  get; set; }
    }
}

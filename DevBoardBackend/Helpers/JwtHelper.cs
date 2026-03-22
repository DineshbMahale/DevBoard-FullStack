using DevBoardBackend.Models.Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DevBoardBackend.Helpers
{
    public class JwtHelper
    {
        private readonly IConfiguration _config;

        public JwtHelper(IConfiguration config)
        {
            _config = config;
        }

        public string GernerateToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
             claims: claims,
             expires: DateTime.Now.AddHours(1),
             signingCredentials: new SigningCredentials(
                 new SymmetricSecurityKey(key),
                 SecurityAlgorithms.HmacSha256
             )
             );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}

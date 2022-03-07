using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuletaController : ControllerBase
    {
        private readonly RuletaContext _context;
        public RuletaController(RuletaContext context)
        {
            _context = context;
        }


        // GET: api/<RuletaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var lista = await _context.Ludopatia.ToListAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // GET api/<RuletaController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _context.Ludopatia.FindAsync(id);

                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // POST api/<RuletaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ludopatium ludopatia)
        {
            try
            {
                _context.Add(ludopatia);
                await _context.SaveChangesAsync();
                return  Ok(ludopatia);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<RuletaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Ludopatium ludopatia)
        {
            try
            {
                if (id != ludopatia.Id)
                {
                    return NotFound();
                }
                _context.Update(ludopatia);
                await _context.SaveChangesAsync();
                return Ok(new {message ="La ruleta fue actualizada correctamente"});
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<RuletaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

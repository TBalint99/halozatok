using HajosTeszt.ProgLangModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/programming-languages")]
    [ApiController]
    public class ProgLangController : ControllerBase
    {
        // GET összes nyelv listázása -> api/programming-languages
        [HttpGet]
        public IEnumerable<Wyaprm> Get()
        {
            SzamhaloContext context = new SzamhaloContext();
            return context.Wyaprms.ToList();
        }

        // GET api/programming-languages/1
        [HttpGet("{id}")]
        public Wyaprm Get(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var keresettNyelv = (from x in context.Wyaprms
                                 where x.Id == id
                                 select x).FirstOrDefault();
            return keresettNyelv;
        }

        // GET api/programming-languages/all
        [HttpGet("all")]
        public ActionResult Counter()
        {
            SzamhaloContext context = new SzamhaloContext();
            return new JsonResult(context.Wyaprms.Count());
        }

        // POST api/programming-languages
        [HttpPost]
        public void Post([FromBody] Wyaprm newLanguage)
        {
            SzamhaloContext context = new SzamhaloContext();
            context.Wyaprms.Add(newLanguage);
            context.SaveChanges();
        }

        // DELETE api/programming-languages/1
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var torlendoNyelv = (from x in context.Wyaprms
                                 where x.Id == id
                                 select x).FirstOrDefault();
            context.Remove(torlendoNyelv);
            context.SaveChanges();
        }
    }
}

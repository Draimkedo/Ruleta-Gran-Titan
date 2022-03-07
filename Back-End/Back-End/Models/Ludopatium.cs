using System;
using System.Collections.Generic;

namespace Back_End.Models
{
    public partial class Ludopatium
    {
        public string CreadorNombre { get; set; } = null!;
        public string CreadorDocumento { get; set; } = null!;
        public string NumeroMinimo { get; set; } = null!;
        public string NumeroMaximo { get; set; } = null!;
        public int Estado { get; set; }
        public string NumeroRuleta { get; set; } = null!;
        public int Id { get; set; }
        public int? Apuesta { get; set; }
    }
}

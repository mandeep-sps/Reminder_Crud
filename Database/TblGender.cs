using System;
using System.Collections.Generic;

namespace DotNetCoreApp.Database
{
    public partial class TblGender
    {
        public int GenderId { get; set; }
        public string Gender { get; set; } = null!;
    }
}

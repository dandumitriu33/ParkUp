using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.CustomLog
{
    public class AdminLogModel
    {
        public LogLevel Level { get; set; }
        public string Description { get; set; }
        public DateTime TimeOfEvent { get; set; } = DateTime.UtcNow;
    }
}

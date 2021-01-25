using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.CustomLog
{
    public class UserLogModel
    {
        public LogLevel Level { get; set; }
        public string Description { get; set; }
        public DateTime TimeOfEvent { get; set; } = DateTime.UtcNow;
    }
}

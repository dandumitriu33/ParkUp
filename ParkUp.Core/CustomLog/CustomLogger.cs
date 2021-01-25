using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ParkUp.Core.CustomLog
{
    public class CustomLogger
    {
        public static void WriteToLogFile<T>(T logEntry, string filePath) where T : class
        {
            var cols = logEntry.GetType().GetProperties();
            StringBuilder line = new StringBuilder();
            foreach (var col in cols)
            {
                line.Append(col.GetValue(logEntry));
                line.Append(" - ");
            }
            line.Append("\n");
            if (File.Exists(filePath) ==  false)
            {
                File.WriteAllText(filePath, line.ToString());
            }
            File.AppendAllText(filePath, line.ToString());
        }
    }
}

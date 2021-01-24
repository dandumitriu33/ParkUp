using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ParkUp.Core.Services
{
    public class FilterAdult
    {
        public static string FilterAdultWords(string phrase)
        {
            Regex wordFilter = new Regex("(naiba|dracu)");
            return wordFilter.Replace(phrase, "***");
        }
    }
}

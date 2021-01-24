using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ParkUp.Core.Services
{
    public class FilterRacism
    {
        public static string FilterRacismWords(string phrase)
        {
            Regex wordFilter = new Regex("(rasa|rasist|rasisti)");
            return wordFilter.Replace(phrase, "***");
        }
    }
}

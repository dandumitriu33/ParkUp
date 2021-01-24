using ParkUp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ParkUp.Core.Services
{
    public class FilterParkingSpaceWording
    {
        public delegate string ReplaceWords(string phrase);
        public static ParkingSpace FilterWording(ParkingSpace parkingSpace, ReplaceWords replaceWords)
        {
            parkingSpace.Name = replaceWords(parkingSpace.Name);
            parkingSpace.StreetName = replaceWords(parkingSpace.StreetName);
            parkingSpace.Description = replaceWords(parkingSpace.Description);
            return parkingSpace;
        }
    }
}

using System;
using System.Collections.Generic;

namespace CellularAutomata.Utilities
{
    public class BinaryUtilities
    {
        /// <summary>
        /// Generates a "binary" array recursively.
        /// I.e. 110 -> [0,1,1,0,1,1,1,0]
        /// </summary>
        private static List<int> _toBinArray(List<int> ar, int remainder, int index)
        {
            if (index == ar.Count) return ar;
            var powerOfTwo = Math.Pow(2, ar.Count - 1);
            ar[index] = remainder >= powerOfTwo ? 1 : 0;
            return _toBinArray(ar, (int)(remainder >= powerOfTwo ? remainder - powerOfTwo : remainder), index + 1);
        }
        public static List<int> ToBinArray(int n)
        {
            var bitsRequired = Math.Ceiling(Math.Log(n, 2));
            if (bitsRequired > 8) throw new Exception("Must be an integer representable by eight bits or less.");
            return _toBinArray(new List<int>((int)bitsRequired), n, 0);
        }
        public static List<int> ToBinArray(int n, int listLength)
        {
            return _toBinArray(new List<int>(listLength), n, 0);
        }
    }
}
